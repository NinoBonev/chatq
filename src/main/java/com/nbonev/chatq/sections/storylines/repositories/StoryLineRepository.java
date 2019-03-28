package com.nbonev.chatq.sections.storylines.repositories;

import com.nbonev.chatq.sections.storylines.entities.StoryLine;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Nino Bonev - 25.3.2019 г., 20:32
 */
public interface StoryLineRepository extends JpaRepository<StoryLine, Long> {
}
