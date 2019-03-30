package com.nbonev.chatq.sections.users.controllers;

/**
 * Created by Nino Bonev - 22.3.2019 г., 8:50
 */

import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.users.models.view.UserViewModel;
import com.nbonev.chatq.sections.users.services.UserService;
import com.nbonev.chatq.security.CurrentUser;
import com.nbonev.chatq.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{username}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public UserViewModel getUserProfile(@PathVariable(value = "username") String username) {

        return this.userService.getUserViewDTOByUsername(username);
    }

    @GetMapping("/admin/users/all")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<UserViewModel> getAllUsersProfiles() {

        return this.userService.getAllUsersViewDTOs();
    }

    @PostMapping("/{group_name}/{username}/start_follow_group")
    @PreAuthorize("isAuthenticated()")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> startFollowingGroup(
            @PathVariable(value = "username") String username,
            @PathVariable(value = "group_name") String group_name) {

        return this.userService.startFollowingGroup(username, group_name);
    }

    @PostMapping("/{group_name}/{username}/stop_follow_group")
    @PreAuthorize("isAuthenticated()")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> stopFollowingGroup(
            @PathVariable(value = "username") String username,
            @PathVariable(value = "group_name") String group_name) {

        return this.userService.stopFollowingGroup(username, group_name);
    }

    @PostMapping("/{myUsername}/{followed_username}/start_follow_user")
    @PreAuthorize("isAuthenticated()")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> startFollowingUser(
            @PathVariable(value = "myUsername") String myUsername,
            @PathVariable(value = "followed_username") String followed_username) {

        return this.userService.startFollowingUser(myUsername, followed_username);
    }

    @PostMapping("/{myUsername}/{followed_username}/stop_follow_user")
    @PreAuthorize("isAuthenticated()")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> stopFollowingUser(
            @PathVariable(value = "myUsername") String myUsername,
            @PathVariable(value = "followed_username") String followed_username) {

        return this.userService.stopFollowingUser(myUsername, followed_username);
    }
}