package com.nbonev.chatq.sections.challenges.repositories;

import com.nbonev.chatq.sections.challenges.entities.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Nino Bonev - 26.3.2019 г., 12:57
 */
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    Challenge findChallengeById(Long id);
}
