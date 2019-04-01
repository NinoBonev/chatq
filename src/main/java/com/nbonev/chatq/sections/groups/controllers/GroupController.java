package com.nbonev.chatq.sections.groups.controllers;

import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.groups.models.binding.GroupCreateBindingModel;
import com.nbonev.chatq.sections.groups.models.view.GroupViewModel;
import com.nbonev.chatq.sections.groups.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
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
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<GroupViewModel> allGroups() {

        return this.groupService.getAllGroupsDTO();
    }

    @GetMapping(path = "/groups/{name}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public GroupViewModel getSingleGroup(@PathVariable("name") String name) {

        return this.groupService.getGroupDTOByName(name);
    }

    @PostMapping(path = "/admin/groups/create_group")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> createGroup(
            @Valid @RequestBody GroupCreateBindingModel groupCreateBindingModel) throws IOException {

        return this.groupService.createGroup(groupCreateBindingModel);
    }

    @PostMapping(path = "/admin/groups/archive/{id}")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> archiveGroup(@PathVariable("id") Long id) {

        this.groupService.archiveGroup(id);

        return ResponseEntity.ok().body(new ApiResponse(true, "Archive Group Message"));
    }

    @PostMapping(path = "/admin/groups/open/{id}")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> openGroup(@PathVariable("id") Long id) {

        this.groupService.openGroup(id);

        return ResponseEntity.ok().body(new ApiResponse(true, "Open Group Message"));
    }

    @PostMapping(path = "/admin/groups/close/{id}")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> closeGroup(@PathVariable("id") Long id) {

        this.groupService.closeGroup(id);

        return ResponseEntity.ok().body(new ApiResponse(true, "Close Group Message"));
    }
}
