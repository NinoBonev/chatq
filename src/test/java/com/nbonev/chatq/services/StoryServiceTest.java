package com.nbonev.chatq.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.challenges.repositories.ChallengeRepository;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.groups.enums.GroupStatus;
import com.nbonev.chatq.sections.groups.repositories.GroupRepository;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.stories.models.binding.StoryCreateBindingModel;
import com.nbonev.chatq.sections.stories.repositories.StoryRepository;
import com.nbonev.chatq.sections.stories.services.StoryService;
import com.nbonev.chatq.sections.stories.services.StoryServiceImpl;
import com.nbonev.chatq.sections.storylines.entities.StoryLine;
import com.nbonev.chatq.sections.storylines.models.binding.StoryLineCreateBindingModel;
import com.nbonev.chatq.sections.storylines.repositories.StoryLineRepository;
import com.nbonev.chatq.sections.storylines.services.StoryLineService;
import com.nbonev.chatq.sections.storylines.services.StoryLineServiceImpl;
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
import java.time.Instant;
import java.util.LinkedHashSet;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Created by Nino Bonev - 14.4.2019 г., 9:21
 */

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@EnableSpringDataWebSupport
public class StoryServiceTest {

    @Mock
    private StoryRepository mockedStoryRepository;

    @Mock
    private StoryLineRepository mockedStoryLineRepository;

    @Mock
    private UserRepository mockedUserRepository;

    @Mock
    private GroupRepository mockedGroupRepository;

    @Mock
    private ChallengeRepository mockedChallengeRepository;

    @InjectMocks
    private ModelMapper mockedModelMapper;

    private StoryService storyService;

    private StoryLineService storyLineService;

    private User nino;

    private Group travel;

    private Challenge takeExam;

    private Story story;

    private StoryCreateBindingModel storyModel;

    private StoryLineCreateBindingModel storyLineModel_1;
    private StoryLineCreateBindingModel storyLineModel_2;
    private StoryLineCreateBindingModel storyLineModel_3;
    private StoryLineCreateBindingModel storyLineModel_4;

    private StoryLine storyLine_1;
    private StoryLine storyLine_2;
    private StoryLine storyLine_3;
    private StoryLine storyLine_4;

    private LinkedHashSet<StoryLine> storyLineSet = new LinkedHashSet<>();
    private LinkedHashSet<StoryLineCreateBindingModel> modelSet = new LinkedHashSet<>();

    @Before
    public void setUp() {
        this.storyLineService = new StoryLineServiceImpl(
                this.mockedStoryLineRepository,
                this.mockedStoryRepository,
                this.mockedModelMapper);

        this.storyService = new StoryServiceImpl(
                this.mockedStoryRepository,
                this.storyLineService,
                this.mockedUserRepository,
                this.mockedGroupRepository,
                this.mockedChallengeRepository,
                this.mockedModelMapper);

        this.story = new Story("Test Story", "This is the story for all travellers",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1553985890/heriptrsvk3feo51cst4.jpg");

        this.storyLine_1 = new StoryLine("This is a test info for storyLineModel_1",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1555079659/k9eg7rqfy0n3b5rvjsmg.jpg",
                story);

        this.storyLine_2 = new StoryLine("This is a test info for storyLineModel_2",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1555079659/k9eg7rqfy0n3b5rvjsmg.jpg",
                story);

        this.storyLine_3 = new StoryLine("This is a test info for storyLineModel_3",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1555079659/k9eg7rqfy0n3b5rvjsmg.jpg",
                story);

        this.storyLine_4 = new StoryLine("This is a test info for storyLineModel_4",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1555079659/k9eg7rqfy0n3b5rvjsmg.jpg",
                story);

        storyLineSet.add(storyLine_1);
        storyLineSet.add(storyLine_2);
        storyLineSet.add(storyLine_3);
        storyLineSet.add(storyLine_4);

        this.story.setStoryLine(this.storyLineSet);

        this.nino = new User("Nino Bonev", "nbonev", "nbonev@gmail.com",
                "1234",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1553985890/heriptrsvk3feo51cst4.jpg");


        this.storyModel = new StoryCreateBindingModel(
                "Test Story", "This is the story for all travellers",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1553985890/heriptrsvk3feo51cst4.jpg",
                nino, 22.2, 33.5, 13.7, 18.5);

        this.travel = new Group("TRavel", "This is a test group for UnitTesting",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1555079659/k9eg7rqfy0n3b5rvjsmg.jpg",
                GroupStatus.OPEN.getStatusName());

        this.takeExam = new Challenge("NewChallenge", "This is a test challenge for UnitTesting",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1555079659/k9eg7rqfy0n3b5rvjsmg.jpg",
                Instant.now(),
                GroupStatus.OPEN.getStatusName());

        this.storyLineModel_1 = new StoryLineCreateBindingModel("This is a test info for storyLineModel_1",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1555079659/k9eg7rqfy0n3b5rvjsmg.jpg");

        this.storyLineModel_2 = new StoryLineCreateBindingModel("This is a test info for storyLineModel_2",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1555079659/k9eg7rqfy0n3b5rvjsmg.jpg");

        this.storyLineModel_3 = new StoryLineCreateBindingModel("This is a test info for storyLineModel_3",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1555079659/k9eg7rqfy0n3b5rvjsmg.jpg");

        this.storyLineModel_4 = new StoryLineCreateBindingModel("This is a test info for storyLineModel_4",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1555079659/k9eg7rqfy0n3b5rvjsmg.jpg");

        modelSet.add(storyLineModel_1);
        modelSet.add(storyLineModel_2);
        modelSet.add(storyLineModel_3);
        modelSet.add(storyLineModel_4);

        when(this.mockedStoryRepository.save(any()))
                .thenAnswer(a -> a.getArgument(0));

        when(this.mockedStoryLineRepository.save(any()))
                .thenAnswer(a -> a.getArgument(0));

        when(this.mockedStoryRepository.findStoryById(story.getId()))
                .thenAnswer(a -> story);

        when(this.mockedUserRepository.findByUsername(nino.getUsername()))
                .thenAnswer(a -> nino);

    }

    @Test
    public void testSaveStory_givenValidStory_shouldNotReturnNull() throws IOException {
        //act
        Story createdStory = this.storyService.create(this.storyModel, this.modelSet);

        //assert
        Assert.assertNotNull("Story is null after creation", createdStory);
    }

    @Test
    public void testSaveStory_givenValidStory_shouldAdd_4_StoryLinesToStory() throws IOException {
        //act
        Story createdStory = this.storyService.create(this.storyModel, this.modelSet);

        //assert
        Assert.assertEquals("StoryLines are not four after creation",
                createdStory.getStoryLine().size(), 4);
    }

    @Test
    public void testLoadStoryById_givenValidGroup_shouldReturnStory() {
        //act
        Story loadedStory = this.mockedStoryRepository.findStoryById(story.getId());

        //assert
        Assert.assertNotNull("Story is null when loaded by name", loadedStory);
        Assert.assertEquals("Wrong story loaded by name", story.toString(), loadedStory.toString());
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testLoadStoryById_givenNotValidId_shouldThrowResourceNotFoundException() {
        //act
        this.storyService.findStoryById(12L);
    }

    @Test
    public void testLoadStoryById_givenValidStory_shouldMapGettersFieldsCorrectly() {
        //act
        Story loadedStory = this.mockedStoryRepository.findStoryById(story.getId());

        //assert
        Assert.assertEquals("Name is not mapped correctly",
                "Test Story" ,loadedStory.getName());
        Assert.assertEquals("Info is not mapped correctly",
                "This is the story for all travellers" , loadedStory.getInfo());
    }

    @Test
    public void testLoadStoryById_givenValidStory_shouldGetStoryLinesCorrectly() {
        //act
        Story loadedStory = this.mockedStoryRepository.findStoryById(story.getId());

        //assert
        Assert.assertEquals("StoryLines are not mapped correctly",
                loadedStory.getStoryLine().size() , 4);
    }

}
