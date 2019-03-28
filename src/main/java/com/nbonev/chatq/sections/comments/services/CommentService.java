package com.nbonev.chatq.sections.comments.services;

import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.comments.models.binding.CommentCreateBindingModel;
import com.nbonev.chatq.sections.comments.models.view.CommentViewModel;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

/**
 * Created by Nino Bonev - 27.3.2019 г., 19:12
 */
public interface CommentService {

    ResponseEntity<ApiResponse> create(CommentCreateBindingModel commentCreateBindingModel) throws IOException;

    Comment findCommentById(Long id);

    CommentViewModel getCommentViewDTOById(Long id);
}
