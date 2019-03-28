package com.nbonev.chatq.sections.storylines.services;

import com.nbonev.chatq.sections.storylines.entities.StoryLine;
import com.nbonev.chatq.sections.storylines.models.binding.StoryLineCreateBindingModel;

import java.io.IOException;
import java.util.List;
import java.util.Set;

/**
 * Created by Nino Bonev - 26.3.2019 г., 8:49
 */


public interface StoryLineService {

    StoryLine create(StoryLineCreateBindingModel storyLineCreateBindingModel) throws IOException;

    Set<StoryLine> findAllStoryStorylinesById(Long id);

    void deleteAllStoryStorylines(Long id);
}
