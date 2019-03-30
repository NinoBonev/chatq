package com.nbonev.chatq.sections.challenges.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.payload.StoryCreatePayload;
import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.challenges.models.binding.ChallengeCreateBindingModel;
import com.nbonev.chatq.sections.challenges.models.view.ChallengeViewModel;
import com.nbonev.chatq.sections.challenges.services.ChallengeService;
import com.nbonev.chatq.sections.stories.models.binding.StoryCreateBindingModel;
import com.nbonev.chatq.sections.stories.services.StoryService;
import com.nbonev.chatq.sections.storylines.models.binding.StoryLineCreateBindingModel;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;

/**
 * Created by Nino Bonev - 27.3.2019 г., 21:54
 */

@RestController
@RequestMapping("/api")
public class ChallengeController {
    private final ChallengeService challengeService;
    private final StoryService storyService;
    private final UserService userService;

    @Autowired
    public ChallengeController(ChallengeService challengeService, StoryService storyService, UserService userService) {
        this.challengeService = challengeService;
        this.storyService = storyService;
        this.userService = userService;
    }

    @GetMapping(path = "/challenges", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ChallengeViewModel> allChallenges() {

        return this.challengeService.getAllChallengesDTO();
    }

    @GetMapping(path = "/challenges/{id}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ChallengeViewModel getSingleGroup(@PathVariable("id") Long id) {

        return this.challengeService.getChallengeDTOById(id);
    }

    @PostMapping("/admin/challenges/create_challenge")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    public ResponseEntity<ApiResponse> createStory(@Valid @RequestBody ChallengeCreateBindingModel challengeCreateBindingModel) throws IOException {

        return this.challengeService.createChallenge(challengeCreateBindingModel);
    }

    @PostMapping(path = "/admin/challenges/archive/{id}")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> archiveChallenge(@PathVariable("id") Long id) {

        this.challengeService.archiveChallenge(id);

        return ResponseEntity.ok().body(new ApiResponse(true, "Archive Challenge Message"));
    }
}
