package com.nbonev.chatq.sections.groups.controllers;

import com.google.gson.Gson;
import com.nbonev.chatq.exception.BadRequestException;
import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.ApiError;
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
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
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
    public ResponseEntity<ApiResponse> allGroups() {
        List<GroupViewModel> groupViewModels;

        try {
            groupViewModels = this.groupService.getAllGroupsDTO();
        } catch (ResourceNotFoundException ex) {
            ApiError error = new ApiError(ex);
            return error.getResourceNotFoundResponseEntity();
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse(true, groupViewModels));
    }

    @GetMapping(path = "/groups/{name}")
    @ResponseBody
    public ResponseEntity<ApiResponse> getSingleGroup(@PathVariable("name") String name) {
        GroupViewModel groupViewModel;

        try {
            groupViewModel = this.groupService.getGroupDTOByName(name);
        } catch (ResourceNotFoundException ex) {
            ApiError error = new ApiError(ex);
            return error.getResourceNotFoundResponseEntity();
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse(true, groupViewModel));

    }

    @PostMapping(path = "/admin/groups/create_group")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    public ResponseEntity<ApiResponse> createGroup(
            @Valid @RequestBody GroupCreateBindingModel groupCreateBindingModel,
            BindingResult bindingResult) throws IOException {

        if (bindingResult.hasErrors()){
            ApiError error = new ApiError(bindingResult);
            return error.getBadRequestResponseEntity();
        }

        this.groupService.createGroup(groupCreateBindingModel);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(true, Constants.GROUP_CREATED_SUCCESS));
    }

    @PostMapping(path = "/admin/groups/archive/{id}")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    public ResponseEntity<ApiResponse> archiveGroup(@PathVariable("id") Long id) {

        try {
            this.groupService.archiveGroup(id);
        } catch (ResourceNotFoundException ex) {
            ApiError error = new ApiError(ex);
            return error.getResourceNotFoundResponseEntity();
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new ApiResponse(true, String.format(Constants.GROUP_ARCHIVED_SUCCESS, id)));
    }

    @PostMapping(path = "/admin/groups/open/{id}")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    public ResponseEntity<ApiResponse> openGroup(@PathVariable("id") Long id) {

        try {
            this.groupService.openGroup(id);
        } catch (ResourceNotFoundException ex) {
            ApiError error = new ApiError(ex);
            return error.getResourceNotFoundResponseEntity();
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new ApiResponse(true, String.format(Constants.GROUP_OPENED_SUCCESS, id)));    }

    @PostMapping(path = "/admin/groups/close/{id}")
    @PreAuthorize("@accessService.isInRoleAdmin(authentication)")
    @ResponseBody
    public ResponseEntity<ApiResponse> closeGroup(@PathVariable("id") Long id) {

        try {
            this.groupService.closeGroup(id);
        } catch (ResourceNotFoundException ex) {
            ApiError error = new ApiError(ex);
            return error.getResourceNotFoundResponseEntity();
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new ApiResponse(true, String.format(Constants.GROUP_CLOSED_SUCCESS, id)));
    }


}
