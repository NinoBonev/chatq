package com.nbonev.chatq.services;

import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.comments.models.binding.CommentCreateBindingModel;
import com.nbonev.chatq.sections.comments.repositories.CommentRepository;
import com.nbonev.chatq.sections.comments.services.CommentService;
import com.nbonev.chatq.sections.comments.services.CommentServiceImpl;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.stories.repositories.StoryRepository;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.repositories.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.test.context.ActiveProfiles;

import java.io.IOException;

import static org.mockito.Mockito.when;

/**
 * Created by Nino Bonev - 12.4.2019 г., 23:14
 */

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@EnableSpringDataWebSupport
public class CommentServiceTest {
    @Mock
    private UserRepository mockedUserRepository;

    @Mock
    private CommentRepository mockedCommentRepository;

    @Mock
    private StoryRepository mockedStoryRepository;

    @InjectMocks
    private ModelMapper mockedModelMapper;

    private CommentService commentService;

    private CommentCreateBindingModel newComment;

    private Comment comment;

    private User nino;

    private Story story;

    @Before
    public void setUp(){
        this.commentService = new CommentServiceImpl(
                this.mockedCommentRepository,
                this.mockedUserRepository,
                this.mockedStoryRepository,
                this.mockedModelMapper);

        this.mockedModelMapper.getConfiguration().setAmbiguityIgnored(true);

        this.nino = new User("Nino Bonev", "nbonev", "nbonev@gmail.com",
                "1234",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1553985890/heriptrsvk3feo51cst4.jpg");
        this.nino.setId(1L);

        this.story = new Story("TestGroup", "This is a test Story for UnitTesting",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1553985890/heriptrsvk3feo51cst4.jpg");
        this.story.setId(2L);

        when(this.mockedUserRepository.findUserById(nino.getId()))
                .thenAnswer(a -> nino);

        when(this.mockedStoryRepository.findStoryById(story.getId()))
                .thenAnswer(a -> story);

        this.newComment = new CommentCreateBindingModel("New Comment",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1553985890/heriptrsvk3feo51cst4.jpg",
                nino.getId(), story.getId());
    }

    @Test
    public void testSaveUser_givenValidUser_shouldNotReturnNull() throws IOException {
        //act
        Comment createdComment = this.commentService.create(this.newComment);

        //assert
        Assert.assertNotNull("Comment is null after creation", createdComment);
    }
}
