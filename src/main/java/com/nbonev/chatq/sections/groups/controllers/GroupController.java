package com.nbonev.chatq.sections.groups.controllers;

import com.nbonev.chatq.exception.BadRequestException;
import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.groups.models.binding.GroupCreateBindingModel;
import com.nbonev.chatq.sections.groups.models.view.GroupViewModel;
import com.nbonev.chatq.sections.groups.services.GroupService;
import com.nbonev.chatq.sections.groups.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Nino Bonev - 24.3.2019 г., 16:58
 */

@RestController
@RequestMapping("/")
public class GroupController {
    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping(path = "/groups", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> allGroups() {
        List<GroupViewModel> groupViewModels = new ArrayList<>();
        try {
            groupViewModels = this.groupService.getAllGroupsDTO();
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (BadRequestException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body(new ApiResponse(true, groupViewModels));
    }

    @GetMapping(path = "/groups/{name}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getSingleGroup(@PathVariable("name") String name) {
        GroupViewModel groupViewModel;

        try {
            groupViewModel = this.groupService.getGroupDTOByName(name);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>(new ApiResponse(false, ex.getMessage()), HttpStatus.NOT_FOUND);
        } catch (BadRequestException ex) {
            return new ResponseEntity<>(new ApiResponse(false, ex.getMessage()), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body(new ApiResponse(true, groupViewModel));

    }

    @PostMapping(path = "/admin/groups/create_group")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> createGroup(
            @Valid @RequestBody GroupCreateBindingModel groupCreateBindingModel) throws IOException {

        try {
            this.groupService.createGroup(groupCreateBindingModel);

        } catch (BadRequestException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body(new ApiResponse(true, Constants.GROUP_CREATED_SUCCESS));
    }

    @PostMapping(path = "/admin/groups/archive/{id}")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> archiveGroup(@PathVariable("id") Long id) {

        try {
            this.groupService.archiveGroup(id);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (BadRequestException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body(new ApiResponse(true, "Archive Group Message"));
    }

    @PostMapping(path = "/admin/groups/open/{id}")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> openGroup(@PathVariable("id") Long id) {

        try {
            this.groupService.openGroup(id);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (BadRequestException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body(new ApiResponse(true, "Open Group Message"));
    }

    @PostMapping(path = "/admin/groups/close/{id}")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> closeGroup(@PathVariable("id") Long id) {

        try {
            this.groupService.closeGroup(id);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (BadRequestException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body(new ApiResponse(true, "Close Group Message"));
    }
}
