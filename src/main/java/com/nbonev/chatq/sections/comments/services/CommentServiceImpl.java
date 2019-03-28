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
    public ResponseEntity<ApiResponse> create(CommentCreateBindingModel commentCreateBindingModel) throws IOException {
        Comment comment = modelMapper.map(commentCreateBindingModel, Comment.class);


        Optional<User> userOptional = this.userRepository.findById(commentCreateBindingModel.getUserId());
        if (!userOptional.isPresent()) {
            throw new ResourceNotFoundException("User", "id", commentCreateBindingModel.getUserId());
        }

        Optional<Story> storyOptional = this.storyRepository.findById(commentCreateBindingModel.getStoryId());

        if (!storyOptional.isPresent()) {
            throw new ResourceNotFoundException("Story", "id", commentCreateBindingModel.getStoryId());
        }

        comment.setUser(userOptional.get());
        comment.setStory(storyOptional.get());
        this.commentRepository.save(comment);

        userOptional.get().addComment(comment);
        this.userRepository.save(userOptional.get());

        storyOptional.get().addComment(comment);
        this.storyRepository.save(storyOptional.get());

        return ResponseEntity.ok().body(new ApiResponse(true, Constants.COMMENT_CREATED_SUCEESS));
    }

    @Override
    public Comment findCommentById(Long id) {
        Optional<Comment> optionalComment = this.commentRepository.findById(id);

        if (!optionalComment.isPresent()) {
            throw new ResourceNotFoundException("Comment", "id", id);
        }

        return optionalComment.get();

    }

    @Override
    public CommentViewModel getCommentViewDTOById(Long id) {
        Optional<Comment> optionalComment = this.commentRepository.findById(id);

        if (!optionalComment.isPresent()) {
            throw new ResourceNotFoundException("Comment", "id", id);
        }

        CommentViewModel commentViewModel = this.modelMapper.map(optionalComment.get(), CommentViewModel.class);
        commentViewModel.setStoryId(optionalComment.get().getStory().getId());
        commentViewModel.setUserId(optionalComment.get().getUser().getId());
        commentViewModel.setCreatedBy(optionalComment.get().getUser().getUsername());

        return commentViewModel;
    }
}
