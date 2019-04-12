package com.nbonev.chatq.sections.challenges.controllers;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.ApiError;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.challenges.models.binding.ChallengeCreateBindingModel;
import com.nbonev.chatq.sections.challenges.models.view.ChallengeViewModel;
import com.nbonev.chatq.sections.challenges.services.ChallengeService;
import com.nbonev.chatq.sections.challenges.utils.Constants;
import com.nbonev.chatq.sections.stories.services.StoryService;
import com.nbonev.chatq.sections.users.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Nino Bonev - 27.3.2019 г., 21:54
 */

@RestController
@RequestMapping("/")
public class ChallengeController {
    private final ChallengeService challengeService;

    @Autowired
    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    @GetMapping(path = "/challenges", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse> allChallenges() {
        List<ChallengeViewModel> challengeViewModels;

        try {
            challengeViewModels = this.challengeService.getAllChallengesDTO();
        } catch (ResourceNotFoundException ex) {
            ApiError apiError = new ApiError(ex);
            return apiError.getResourceNotFoundResponseEntity();
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse(true, challengeViewModels));
    }

    @GetMapping(path = "/challenges/{id}")
    @ResponseBody
    public ResponseEntity<ApiResponse> getSingleGroup(@PathVariable("id") Long id) {
        ChallengeViewModel challengeViewModel;

        try {
            challengeViewModel = this.challengeService.getChallengeDTOById(id);
        } catch (ResourceNotFoundException ex) {
            ApiError error = new ApiError(ex);
            return error.getResourceNotFoundResponseEntity();
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse(true, challengeViewModel));

    }

    @PostMapping("/admin/challenges/create_challenge")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    public ResponseEntity<ApiResponse> createChallenge(@Valid @RequestBody
                                                     ChallengeCreateBindingModel challengeCreateBindingModel,
                                             BindingResult bindingResult) throws IOException {
        if (bindingResult.hasErrors()){
            ApiError apiError = new ApiError(bindingResult);
            return apiError.getBadRequestResponseEntity();
        }

        this.challengeService.createChallenge(challengeCreateBindingModel);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(true, Constants.CHALLENGE_CREATE_SUCCESS));
    }

    @PostMapping(path = "/admin/challenges/archive/{id}")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> archiveChallenge(@PathVariable("id") Long id) {

        try {
            this.challengeService.archiveChallenge(id);
        } catch (ResourceNotFoundException ex) {
            ApiError error = new ApiError(ex);
            return error.getResourceNotFoundResponseEntity();
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new ApiResponse(true, String.format(Constants.CHALLENGE_ARCHIVE_SUCCESS, id)));
    }
}
