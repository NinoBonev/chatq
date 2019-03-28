package com.nbonev.chatq.sections.stories.repositories;

import com.nbonev.chatq.sections.stories.entities.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by Nino Bonev - 25.3.2019 г., 12:43
 */

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {

    Optional<Story> findByName(String name);
}
