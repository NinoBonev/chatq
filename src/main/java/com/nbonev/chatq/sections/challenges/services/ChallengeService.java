package com.nbonev.chatq.sections.challenges.services;

import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.challenges.models.binding.ChallengeCreateBindingModel;
import com.nbonev.chatq.sections.challenges.models.view.ChallengeViewModel;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * Created by Nino Bonev - 26.3.2019 г., 12:46
 */


public interface ChallengeService {

    ResponseEntity<ApiResponse> createChallenge(ChallengeCreateBindingModel challengeCreateBindingModel) throws IOException;

    List<Challenge> findAllChallenges();

    List<ChallengeViewModel> getAllChallengesDTO();

    Optional<Challenge> findChallengeById(Long id);

    ChallengeViewModel getChallengeDTOById(Long id);

}
