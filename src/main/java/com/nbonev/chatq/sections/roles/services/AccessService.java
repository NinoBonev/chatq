package com.nbonev.chatq.sections.roles.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.stories.services.StoryService;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccessService {
    private final StoryService storyService;

    @Autowired
    public AccessService(StoryService storyService) {
        this.storyService = storyService;
    }

    public boolean isInRoleAdmin(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return userPrincipal.getAuthorities().stream().anyMatch(ga -> ga.getAuthority().equals("ROLE_ADMIN"));
    }

    public boolean isStoryOwner(Authentication authentication, Long id) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Story story = this.storyService.findStoryById(id);


        return story.getUser().getId().equals(userPrincipal.getId());
    }

    public boolean isStoryOwnerOrAdmin(Authentication authentication, Long id) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Story story = this.storyService.findStoryById(id);


        return authentication.getAuthorities().stream().anyMatch(ga -> ga.getAuthority().equals("ROLE_ADMIN"))
        || story.getUser().getId().equals(userPrincipal.getId());
    }
}
