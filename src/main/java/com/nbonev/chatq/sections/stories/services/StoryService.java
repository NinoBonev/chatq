package com.nbonev.chatq.sections.stories.services;

import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.stories.models.binding.StoryCreateBindingModel;
import com.nbonev.chatq.sections.stories.models.binding.StoryEditBindingModel;
import com.nbonev.chatq.sections.stories.models.view.StoryViewModel;
import com.nbonev.chatq.sections.storylines.models.binding.StoryLineCreateBindingModel;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.Optional;

/**
 * Created by Nino Bonev - 25.3.2019 г., 12:44
 */
public interface StoryService {

    Story create(StoryCreateBindingModel storyCreateBindingModel,
                                       LinkedHashSet<StoryLineCreateBindingModel> storyLineCreateBindingModels) throws IOException;

    Story findStoryById(Long id);

    void editStory(Long id, StoryEditBindingModel storyEditBindingModel) throws IOException;

    void deleteStory(Long id);

    StoryViewModel getStoryViewDTOById(Long id);
}
