package com.nbonev.chatq.sections.storylines.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.stories.repositories.StoryRepository;
import com.nbonev.chatq.sections.storylines.entities.StoryLine;
import com.nbonev.chatq.sections.storylines.models.binding.StoryLineCreateBindingModel;
import com.nbonev.chatq.sections.storylines.repositories.StoryLineRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Created by Nino Bonev - 26.3.2019 г., 8:50
 */

@Service
public class StoryLineServiceImpl implements StoryLineService {
    private final StoryLineRepository storyLineRepository;
    private final StoryRepository storyRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public StoryLineServiceImpl(StoryLineRepository storyLineRepository, StoryRepository storyRepository, ModelMapper modelMapper) {
        this.storyLineRepository = storyLineRepository;
        this.storyRepository = storyRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public StoryLine create(StoryLineCreateBindingModel storyLineCreateBindingModel) throws IOException {
        storyLineCreateBindingModel.uploadAndSetStoryLine();

        StoryLine storyLine = modelMapper.map(storyLineCreateBindingModel, StoryLine.class);

        return this.storyLineRepository.save(storyLine);
    }

    @Override
    public Set<StoryLine> findAllStoryStorylinesById(Long id) {
        Optional<Story> storyOptional = this.storyRepository.findById(id);

        if (!storyOptional.isPresent()) {
            throw new ResourceNotFoundException("Group", "id", id);
        }

        return storyOptional.get().getStoryLine();
    }

    @Override
    @Async
    public void deleteAllStoryStorylines(Long id) {
        this.findAllStoryStorylinesById(id).forEach(storyLine -> {
            this.storyLineRepository.deleteById(storyLine.getId());
        });
    }
}
