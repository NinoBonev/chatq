package com.nbonev.chatq.sections.comments.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.comments.models.binding.CommentCreateBindingModel;
import com.nbonev.chatq.sections.comments.models.view.CommentViewModel;
import com.nbonev.chatq.sections.comments.repositories.CommentRepository;
import com.nbonev.chatq.sections.comments.utils.Constants;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.stories.repositories.StoryRepository;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

/**
 * Created by Nino Bonev - 27.3.2019 г., 19:12
 */

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final StoryRepository storyRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository, StoryRepository storyRepository, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.storyRepository = storyRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Comment create(CommentCreateBindingModel commentCreateBindingModel) {
        Comment comment = modelMapper.map(commentCreateBindingModel, Comment.class);
        User user = this.userRepository.findUserById(commentCreateBindingModel.getUserId());
        Story story = this.storyRepository.findStoryById(commentCreateBindingModel.getStoryId());

        comment.setUser(user);
        comment.setStory(story);

        Comment created = this.commentRepository.save(comment);

        user.addComment(comment);
        this.userRepository.save(user);

        story.addComment(comment);
        this.storyRepository.save(story);

        return created;
    }

    @Override
    public Comment findCommentById(Long id) {
        Comment comment = this.commentRepository.findCommentById(id);

        if (comment == null) {
            throw new ResourceNotFoundException("Comment", "id", id);
        }

        return comment;

    }

    @Override
    public CommentViewModel getCommentViewDTOById(Long id) {
        Comment comment = this.findCommentById(id);

        CommentViewModel commentViewModel = this.modelMapper.map(comment, CommentViewModel.class);
        commentViewModel.setStoryId(comment.getStory().getId());
        commentViewModel.setUserId(comment.getUser().getId());
        commentViewModel.setCreatedBy(comment.getUser().getUsername());

        return commentViewModel;
    }
}
