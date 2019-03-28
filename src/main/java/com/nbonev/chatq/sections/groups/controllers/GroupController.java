package com.nbonev.chatq.sections.groups.controllers;

import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.groups.models.view.GroupViewModel;
import com.nbonev.chatq.sections.groups.services.GroupService;
import com.nbonev.chatq.sections.users.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Nino Bonev - 24.3.2019 г., 16:58
 */

@RestController
@RequestMapping("/api")
public class GroupController {
    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping(path = "/groups", produces=MediaType.APPLICATION_JSON_VALUE)
    public List<GroupViewModel> allGroups() {

        return this.groupService.getAllGroupsDTO();
    }

    @GetMapping(path = "/groups/{name}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public GroupViewModel getSingleGroup(@PathVariable("name") String name) {

        return this.groupService.getGroupDTOByName(name);
    }
}
