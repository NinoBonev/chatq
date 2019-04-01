package com.nbonev.chatq.sections.comments.controllers;

import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.comments.models.binding.CommentCreateBindingModel;
import com.nbonev.chatq.sections.comments.models.view.CommentViewModel;
import com.nbonev.chatq.sections.comments.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @ResponseStatus(HttpStatus.OK)
    public CommentViewModel getSingleComment(@PathVariable("id") Long id) {

        return this.commentService.getCommentViewDTOById(id);
    }

    @PostMapping("/story/add_comment")
    @PreAuthorize("isAuthenticated()")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ApiResponse> createComment(
            @Valid @RequestBody CommentCreateBindingModel commentCreateBindingModel) throws IOException {

        return this.commentService.create(commentCreateBindingModel);
    }
}
