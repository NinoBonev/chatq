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
    public ResponseEntity<ApiResponse> create(StoryCreateBindingModel storyCreateBindingModel,
                                              LinkedHashSet<StoryLineCreateBindingModel> storyLineCreateBindingModels) throws IOException {
        storyCreateBindingModel.uploadAndSetCover(storyCreateBindingModel.getCover());

        Story story = modelMapper.map(storyCreateBindingModel, Story.class);
        this.storyRepository.save(story);

        Optional<User> userOptional = this.userRepository.findByUsername(storyCreateBindingModel.getUser().getUsername());
        if (!userOptional.isPresent()) {
            throw new ResourceNotFoundException("User", "username", storyCreateBindingModel.getUser().getUsername());
        }

        if (storyCreateBindingModel.getGroup() != null) {
            Optional<Group> groupOptional = this.groupRepository.findByName(storyCreateBindingModel.getGroup().getName());

            if (!groupOptional.isPresent()) {
                throw new ResourceNotFoundException("Group", "name", storyCreateBindingModel.getGroup().getName());
            }

            userOptional.get().addStory(story);
            this.userRepository.save(userOptional.get());

            groupOptional.get().addStory(story);
            this.groupRepository.save(groupOptional.get());
        }

        if (storyCreateBindingModel.getChallenge() != null) {
            Optional<Challenge> challengeOptional = this.challengeRepository.findById(storyCreateBindingModel.getChallenge().getId());

            if (!challengeOptional.isPresent()) {
                throw new ResourceNotFoundException("Group", "name", storyCreateBindingModel.getGroup().getName());
            }

            userOptional.get().addStory(story);
            this.userRepository.save(userOptional.get());

            challengeOptional.get().addStory(story);
            this.challengeRepository.save(challengeOptional.get());
        }


        LinkedHashSet<StoryLine> storyLines = new LinkedHashSet<>();

        for (StoryLineCreateBindingModel storyLineCreateBindingModel : storyLineCreateBindingModels) {
            storyLineCreateBindingModel.setStory(story);

            StoryLine storyLine = this.storyLineService.create(storyLineCreateBindingModel);
            storyLines.add(storyLine);
        }

        Optional<Story> optionalStory = this.storyRepository.findByName(storyCreateBindingModel.getName());


        if (!optionalStory.isPresent()) {
            throw new ResourceNotFoundException("Story", "name", storyCreateBindingModel.getName());
        }

        optionalStory.get().setStoryLine(storyLines);
        this.storyRepository.save(optionalStory.get());

        return ResponseEntity.ok().body(new ApiResponse(true, Constants.STORY_CREATED_SUCEESS));
    }

    @Override
    public Optional<Story> findStoryById(Long id) {
        Optional<Story> storyOptional = this.storyRepository.findById(id);
        if (!storyOptional.isPresent()) {
            throw new ResourceNotFoundException("Group", "id", id);
        }

        return storyOptional;
    }

    @Override
    public Story editStory(Long id, StoryEditBindingModel storyEditBindingModel) throws IOException {
        Optional<Story> storyOptional = this.findStoryById(id);
        if (!storyOptional.isPresent()) {
            throw new ResourceNotFoundException("Group", "id", id);
        }

        if (storyEditBindingModel.getName() != null){
            storyOptional.get().setName(storyEditBindingModel.getName());
        }

        if (storyEditBindingModel.getCover() != null){
            storyEditBindingModel.uploadAndSetCover(storyEditBindingModel.getCover());

            storyOptional.get().setCover(storyEditBindingModel.getCover());
        }

        if (storyEditBindingModel.getInfo() != null){
            storyOptional.get().setInfo(storyEditBindingModel.getInfo());
        }

        return this.storyRepository.save(storyOptional.get());
    }

    @Async
    @Override
    public void deleteStory(Long id) {
        this.storyRepository.deleteById(id);
    }

    @Override
    public StoryViewModel getStoryViewDTOById(Long id) {
        Optional<Story> storyOptional = this.storyRepository.findById(id);

        if (!storyOptional.isPresent()) {
            throw new ResourceNotFoundException("Group", "id", id);
        }
        StoryViewModel storyViewModel = this.modelMapper.map(storyOptional.get(), StoryViewModel.class);
        storyViewModel.setUsername(storyOptional.get().getUser().getUsername());
        storyViewModel.setUserId(storyOptional.get().getUser().getId());

        if (storyOptional.get().getGroup() != null) {
            storyViewModel.setGroup_name(storyOptional.get().getGroup().getName());
            storyViewModel.setGroupId(storyOptional.get().getGroup().getId());
        }

        if (storyOptional.get().getChallenge() != null) {
            storyViewModel.setChallenge_name(storyOptional.get().getChallenge().getName());
            storyViewModel.setChallengeId(storyOptional.get().getChallenge().getId());
        }

        return storyViewModel;
    }
}
