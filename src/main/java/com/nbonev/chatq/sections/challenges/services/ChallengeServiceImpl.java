package com.nbonev.chatq.sections.challenges.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.challenges.models.binding.ChallengeCreateBindingModel;
import com.nbonev.chatq.sections.challenges.models.view.ChallengeViewModel;
import com.nbonev.chatq.sections.challenges.repositories.ChallengeRepository;
import com.nbonev.chatq.sections.challenges.utils.Constants;
import com.nbonev.chatq.sections.stories.entities.Story;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Nino Bonev - 26.3.2019 г., 12:56
 */

@Service
public class ChallengeServiceImpl implements ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final ModelMapper modelMapper;

    public ChallengeServiceImpl(ChallengeRepository challengeRepository, ModelMapper modelMapper) {
        this.challengeRepository = challengeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ResponseEntity<ApiResponse> createChallenge(ChallengeCreateBindingModel challengeCreateBindingModel) throws IOException {
        challengeCreateBindingModel.uploadAndSetCover(challengeCreateBindingModel.getCover());

        Challenge challenge = this.modelMapper.map(challengeCreateBindingModel, Challenge.class);
        this.challengeRepository.save(challenge);

        return ResponseEntity.ok().body(new ApiResponse(true, Constants.CHALLENGE_CREATE_SUCCESS));
    }

    @Override
    public List<Challenge> findAllChallenges() {
        return this.challengeRepository.findAll();
    }

    @Override
    public List<ChallengeViewModel> getAllChallengesDTO() {
        List<Challenge> challenges = this.challengeRepository.findAll();

        return challenges.stream().map(challenge -> {
            ChallengeViewModel challengeViewModel = this.modelMapper.map(challenge, ChallengeViewModel.class);
            challengeViewModel.setStoriesById(challenge.getStories().stream().map(Story::getId).collect(Collectors.toSet()));
            return  challengeViewModel;
        }).collect(Collectors.toList());
    }


    @Override
    public Optional<Challenge> findChallengeById(Long id) {
        Optional<Challenge> challengeOptional = this.challengeRepository.findById(id);

        if (!challengeOptional.isPresent()) {
            throw new ResourceNotFoundException("Group", "id", id);
        }

        return challengeOptional;
    }

    @Override
    public ChallengeViewModel getChallengeDTOById(Long id) {

        Optional<Challenge> challengeOptional = this.challengeRepository.findById(id);

        if (!challengeOptional.isPresent()) {
            throw new ResourceNotFoundException("Group", "id", id);
        }

        ChallengeViewModel challengeViewModel = this.modelMapper.map(challengeOptional.get(), ChallengeViewModel.class);
        challengeViewModel.setStoriesById(challengeOptional.get().getStories().stream().map(Story::getId).collect(Collectors.toSet()));

        return challengeViewModel;

    }

}
