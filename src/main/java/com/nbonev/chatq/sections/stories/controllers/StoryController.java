package com.nbonev.chatq.sections.stories.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.challenges.services.ChallengeService;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.groups.services.GroupService;
import com.nbonev.chatq.sections.stories.models.binding.StoryCreateBindingModel;
import com.nbonev.chatq.payload.StoryCreatePayload;
import com.nbonev.chatq.sections.stories.models.binding.StoryEditBindingModel;
import com.nbonev.chatq.sections.stories.models.view.StoryViewModel;
import com.nbonev.chatq.sections.stories.services.StoryService;
import com.nbonev.chatq.sections.stories.utils.Constants;
import com.nbonev.chatq.sections.storylines.models.binding.StoryLineCreateBindingModel;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.Optional;

/**
 * Created by Nino Bonev - 25.3.2019 г., 20:09
 */

@RestController
@RequestMapping("/")
public class StoryController {

    private final StoryService storyService;
    private final UserService userService;
    private final GroupService groupService;
    private final ChallengeService challengeService;

    public StoryController(StoryService storyService, UserService userService, GroupService groupService, ChallengeService challengeService) {
        this.storyService = storyService;
        this.userService = userService;
        this.groupService = groupService;
        this.challengeService = challengeService;
    }

    @GetMapping(path = "/story/{id}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public StoryViewModel getSingleStory(@PathVariable("id") Long id) {

        return this.storyService.getStoryViewDTOById(id);
    }

    @PostMapping("/story/create")
    @PreAuthorize("isAuthenticated()")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> createStory(@Valid @RequestBody StoryCreatePayload storyCreatePayload) throws IOException {

        StoryCreateBindingModel storyCreateBindingModel = new StoryCreateBindingModel();

        User user = this.userService.findUserByUsername(storyCreatePayload.getUserByUsername());


        //TODO ---> Send crop as parameter to upload
        storyCreateBindingModel.setName(storyCreatePayload.getName());
        storyCreateBindingModel.setCover(storyCreatePayload.getCover());
        storyCreateBindingModel.setInfo(storyCreatePayload.getInfo());
        storyCreateBindingModel.setWidth(storyCreatePayload.getWidth());
        storyCreateBindingModel.setHeight(storyCreatePayload.getHeight());
        storyCreateBindingModel.setX(storyCreatePayload.getX());
        storyCreateBindingModel.setY(storyCreatePayload.getY());

        storyCreateBindingModel.setUser(user);

        if (storyCreatePayload.getGroup() != null){
            Group group = this.groupService.findGroupById(storyCreatePayload.getGroup());

            storyCreateBindingModel.setGroup(group);
        }

        if (storyCreatePayload.getChallenge() != null){
            Challenge challenge = this.challengeService.findChallengeById(storyCreatePayload.getChallenge());

            storyCreateBindingModel.setChallenge(challenge);
        }

        ObjectMapper objectMapper = new ObjectMapper();
        LinkedHashSet<StoryLineCreateBindingModel> storyLines = objectMapper.
                readValue(storyCreatePayload
                                .getStoryLine(),
                        TypeFactory
                                .defaultInstance()
                                .constructCollectionType(LinkedHashSet.class, StoryLineCreateBindingModel.class));

        this.storyService.create(storyCreateBindingModel, storyLines);

        return ResponseEntity.ok().body(new ApiResponse(true, Constants.STORY_CREATED_SUCEESS));

    }

    @PostMapping("/story/delete/{id}")
    @PreAuthorize("@accessService.isStoryOwnerOrAdmin(authentication, #id)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> deleteStory(@PathVariable("id") Long id){
        this.storyService.deleteStory(id);

        return ResponseEntity.ok().body(new ApiResponse(true, "Delete Message"));
    }

    @PostMapping("/story/editInfo/{id}")
    @PreAuthorize("@accessService.isStoryOwner(authentication, #id)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> editStory(@PathVariable("id") Long id,
                                                 @Valid @RequestBody StoryEditBindingModel storyEditBindingModel) throws IOException {
        this.storyService.editStory(id, storyEditBindingModel);

        return ResponseEntity.ok().body(new ApiResponse(true, "Edit Message"));
    }
}
