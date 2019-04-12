package com.nbonev.chatq.sections.comments.controllers;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.ApiError;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.comments.models.binding.CommentCreateBindingModel;
import com.nbonev.chatq.sections.comments.models.view.CommentViewModel;
import com.nbonev.chatq.sections.comments.services.CommentService;
import com.nbonev.chatq.sections.comments.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

/**
 * Created by Nino Bonev - 27.3.2019 г., 19:33
 */

@RestController
@RequestMapping("/")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(path = "/comments/{id}")
    @ResponseBody
    public ResponseEntity<ApiResponse> getSingleComment(@PathVariable("id") Long id) {
        CommentViewModel commentViewModel;

        try {
            commentViewModel = this.commentService.getCommentViewDTOById(id);
        } catch (ResourceNotFoundException ex) {
            ApiError error = new ApiError(ex);
            return error.getResourceNotFoundResponseEntity();
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse(true, commentViewModel));

    }

    @PostMapping("/story/add_comment")
    @PreAuthorize("isAuthenticated()")
    @ResponseBody
    public ResponseEntity<ApiResponse> createComment(
            @Valid @RequestBody CommentCreateBindingModel commentCreateBindingModel,
            BindingResult bindingResult) throws IOException {

        if (bindingResult.hasErrors()){
            ApiError apiError = new ApiError(bindingResult);
            return apiError.getBadRequestResponseEntity();
        }

        this.commentService.create(commentCreateBindingModel);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(true, Constants.COMMENT_CREATED_SUCEESS));
    }
}
