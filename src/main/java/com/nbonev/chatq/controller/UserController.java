package com.nbonev.chatq.controller;

/**
 * Created by Nino Bonev - 22.3.2019 г., 8:50
 */

import com.nbonev.chatq.entity.User;
import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.UserIdentityAvailability;
import com.nbonev.chatq.payload.UserProfile;
import com.nbonev.chatq.payload.UserSummary;
import com.nbonev.chatq.repository.UserRepository;
import com.nbonev.chatq.security.CurrentUser;
import com.nbonev.chatq.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private PollRepository pollRepository;
//
//    @Autowired
//    private VoteRepository voteRepository;
//
//    @Autowired
//    private PollService pollService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(), currentUser.getAvatar());
        return userSummary;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));


        UserProfile userProfile = new UserProfile(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getAvatar(),
                user.getEmail()
//                user.getStories(),
//                user.getChallenges(),
       //         user.getComments()
//                user.getFollowingUsers(),
//                user.getFollowers(),
//                user.getFollowingGroups()
                );

        return userProfile;
    }

//    @GetMapping("/users/{username}/polls")
//    public PagedResponse<PollResponse> getPollsCreatedBy(@PathVariable(value = "username") String username,
//                                                         @CurrentUser UserPrincipal currentUser,
//                                                         @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
//                                                         @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
//        return pollService.getPollsCreatedBy(username, currentUser, page, size);
//    }
//
//
//    @GetMapping("/users/{username}/votes")
//    public PagedResponse<PollResponse> getPollsVotedBy(@PathVariable(value = "username") String username,
//                                                       @CurrentUser UserPrincipal currentUser,
//                                                       @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
//                                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
//        return pollService.getPollsVotedBy(username, currentUser, page, size);
//    }
}