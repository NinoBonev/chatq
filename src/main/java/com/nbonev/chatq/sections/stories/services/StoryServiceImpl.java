package com.nbonev.chatq.sections.stories.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.challenges.repositories.ChallengeRepository;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.groups.repositories.GroupRepository;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.stories.models.binding.StoryCreateBindingModel;
import com.nbonev.chatq.sections.stories.models.binding.StoryEditBindingModel;
import com.nbonev.chatq.sections.stories.models.view.StoryViewModel;
import com.nbonev.chatq.sections.stories.repositories.StoryRepository;
import com.nbonev.chatq.sections.stories.utils.Constants;
import com.nbonev.chatq.sections.storylines.entities.StoryLine;
import com.nbonev.chatq.sections.storylines.models.binding.StoryLineCreateBindingModel;
import com.nbonev.chatq.sections.storylines.services.StoryLineService;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by Nino Bonev - 25.3.2019 г., 12:46
 */

@Service
public class StoryServiceImpl implements StoryService {
    private final StoryRepository storyRepository;
    private final StoryLineService storyLineService;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final ChallengeRepository challengeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public StoryServiceImpl(StoryRepository storyRepository, StoryLineService storyLineService, UserRepository userRepository, GroupRepository groupRepository, ChallengeRepository challengeRepository, ModelMapper modelMapper) {
        this.storyRepository = storyRepository;
        this.storyLineService = storyLineService;
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.challengeRepository = challengeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Story create(StoryCreateBindingModel storyCreateBindingModel,
                                              LinkedHashSet<StoryLineCreateBindingModel> storyLineCreateBindingModels) throws IOException {

        storyCreateBindingModel.uploadAndSetCover();

        Story story = modelMapper.map(storyCreateBindingModel, Story.class);
        Story saved = this.storyRepository.save(story);

        Long id = saved.getId();

        User user = this.userRepository.findByUsername(storyCreateBindingModel.getUser().getUsername());

        if (storyCreateBindingModel.getGroup() != null) {
            Group group = this.groupRepository.findGroupByName(storyCreateBindingModel.getGroup().getName());

            user.addStory(story);
            this.userRepository.save(user);

            group.addStory(story);
            this.groupRepository.save(group);
        }

        if (storyCreateBindingModel.getChallenge() != null) {
            Challenge challenge = this.challengeRepository.findChallengeById(storyCreateBindingModel.getChallenge().getId());

            user.addStory(story);
            this.userRepository.save(user);

            challenge.addStory(story);
            this.challengeRepository.save(challenge);
        }


        LinkedHashSet<StoryLine> storyLines = new LinkedHashSet<>();

        for (StoryLineCreateBindingModel storyLineCreateBindingModel : storyLineCreateBindingModels) {
            storyLineCreateBindingModel.setStory(story);

            StoryLine storyLine = this.storyLineService.create(storyLineCreateBindingModel);
            storyLines.add(storyLine);
        }

        Story updatedStory = this.findStoryById(id);

        updatedStory.setStoryLine(storyLines);
        return this.storyRepository.save(updatedStory);
    }

    @Override
    public Story findStoryById(Long id) {
        Story story = this.storyRepository.findStoryById(id);
        if (story == null) {
            throw new ResourceNotFoundException("Group", "id", id);
        }

        return story;
    }

    @Override
    public void editStory(Long id, StoryEditBindingModel storyEditBindingModel) throws IOException {
        Story story = this.findStoryById(id);

        if (storyEditBindingModel.getName() != null){
            story.setName(storyEditBindingModel.getName());
        }

        if (storyEditBindingModel.getCover() != null){
            storyEditBindingModel.uploadAndSetCover(storyEditBindingModel.getCover());

            story.setCover(storyEditBindingModel.getCover());
        }

        if (storyEditBindingModel.getInfo() != null){
            story.setInfo(storyEditBindingModel.getInfo());
        }

        this.storyRepository.save(story);
    }

    @Async
    @Override
    public void deleteStory(Long id) {
        this.storyRepository.deleteById(id);
    }

    @Override
    public StoryViewModel getStoryViewDTOById(Long id) {
        Story story = this.findStoryById(id);

        StoryViewModel storyViewModel = this.modelMapper.map(story, StoryViewModel.class);
        storyViewModel.setUsername(story.getUser().getUsername());
        storyViewModel.setUserId(story.getUser().getId());

        if (story.getGroup() != null) {
            storyViewModel.setGroup_name(story.getGroup().getName());
            storyViewModel.setGroupId(story.getGroup().getId());
        }

        if (story.getChallenge() != null) {
            storyViewModel.setChallenge_name(story.getChallenge().getName());
            storyViewModel.setChallengeId(story.getChallenge().getId());
        }

        return storyViewModel;
    }
}
