package com.nbonev.chatq.sections.challenges.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.challenges.enums.ChallengeStatus;
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
    public Challenge createChallenge(ChallengeCreateBindingModel challengeCreateBindingModel) throws IOException {

        challengeCreateBindingModel.uploadAndSetCover();
        challengeCreateBindingModel.setStatus(ChallengeStatus.OPEN.getStatusName());

        Challenge challenge = this.modelMapper.map(challengeCreateBindingModel, Challenge.class);
        return this.challengeRepository.save(challenge);
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
    public Challenge findChallengeById(Long id) {
        Challenge challenge = this.challengeRepository.findChallengeById(id);

        if (challenge == null) {
            throw new ResourceNotFoundException("Group", "id", id);
        }

        return challenge;
    }

    @Override
    public ChallengeViewModel getChallengeDTOById(Long id) {
        Challenge challenge = this.findChallengeById(id);

        ChallengeViewModel challengeViewModel = this.modelMapper.map(challenge, ChallengeViewModel.class);
        challengeViewModel.setStoriesById(challenge.getStories().stream().map(Story::getId).collect(Collectors.toSet()));

        return challengeViewModel;

    }

    @Override
    public void archiveChallenge(Long id) {
        Challenge challenge = this.findChallengeById(id);

        challenge.setStatus(ChallengeStatus.ARCHIVED.getStatusName());

        this.challengeRepository.save(challenge);
    }

    @Override
    public void closeChallenge(Long id) {
        Challenge challenge = this.findChallengeById(id);

        challenge.setStatus(ChallengeStatus.CLOSED.getStatusName());

        this.challengeRepository.save(challenge);
    }

    @Override
    public void openChallenge(Long id) {
        Challenge challenge = this.findChallengeById(id);

        challenge.setStatus(ChallengeStatus.OPEN.getStatusName());

        this.challengeRepository.save(challenge);
    }

}
