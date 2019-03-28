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

//    @PostMapping("/users/challenges/add_story")
//    @PreAuthorize("isAuthenticated()")
//    public ResponseEntity<ApiResponse> createStory(@Valid @RequestBody StoryCreatePayload storyCreatePayload) throws IOException {
//
//        StoryCreateBindingModel storyCreateBindingModel = new StoryCreateBindingModel();
//
//        Optional<User> optionalUser = this.userService.findUserByUsername(storyCreatePayload.getUserByUsername());
//
//        if (!optionalUser.isPresent()){
//            throw new ResourceNotFoundException("Group", "username", storyCreatePayload.getUserByUsername());
//        }
//
//        //TODO ---> Send crop as parameter to upload
//        storyCreateBindingModel.setName(storyCreatePayload.getName());
//        storyCreateBindingModel.setCover(storyCreatePayload.getCover());
//        storyCreateBindingModel.setInfo(storyCreatePayload.getInfo());
//        storyCreateBindingModel.setUser(optionalUser.get());
//
//        if (storyCreatePayload.getChallenge() != null){
//            Optional<Challenge> challengeOptional = this.challengeService.findChallengeById(storyCreatePayload.getChallenge());
//
//            if (!challengeOptional.isPresent()) {
//                throw new ResourceNotFoundException("Challenge", "id", storyCreatePayload.getChallenge());
//            }
//
//            storyCreateBindingModel.setChallenge(challengeOptional.get());
//        }
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        LinkedHashSet<StoryLineCreateBindingModel> storyLines = objectMapper.
//                readValue(storyCreatePayload
//                                .getStoryLine(),
//                        TypeFactory
//                                .defaultInstance()
//                                .constructCollectionType(LinkedHashSet.class, StoryLineCreateBindingModel.class));
//
//        return this.storyService.create(storyCreateBindingModel, storyLines);
//
//    }
}
