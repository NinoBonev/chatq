package com.nbonev.chatq.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.groups.enums.GroupStatus;
import com.nbonev.chatq.sections.groups.models.binding.GroupCreateBindingModel;
import com.nbonev.chatq.sections.groups.repositories.GroupRepository;
import com.nbonev.chatq.sections.groups.services.GroupService;
import com.nbonev.chatq.sections.groups.services.GroupServiceImpl;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.users.entities.User;
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
import java.util.HashSet;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Created by Nino Bonev - 14.4.2019 г., 8:27
 */

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@EnableSpringDataWebSupport
public class GroupServiceTest {

    @Mock
    private GroupRepository mockedGroupRepository;

    @InjectMocks
    private ModelMapper mockedModelMapper;

    private GroupService groupService;

    private GroupCreateBindingModel groupTravelBindingModel;

    private Group travel;

    @Before
    public void setUp() {
        this.groupService = new GroupServiceImpl(
                this.mockedGroupRepository,
                this.mockedModelMapper
        );

        this.groupTravelBindingModel = new GroupCreateBindingModel("Travel",
                "This is the group for all travellers",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1553985890/heriptrsvk3feo51cst4.jpg",
                22.2, 33.5, 13.7, 18.5);

        this.travel = new Group("Travel",
                "This is the group for all travellers",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1553985890/heriptrsvk3feo51cst4.jpg",
                GroupStatus.OPEN.getStatusName());

        when(this.mockedGroupRepository.save(any()))
                .thenAnswer(a -> a.getArgument(0));

        when(this.mockedGroupRepository.findGroupById(travel.getId()))
                .thenAnswer(a -> travel);

        when(this.mockedGroupRepository.findGroupByName(travel.getName()))
                .thenAnswer(a -> travel);
    }

    @Test
    public void testSaveGroup_givenValidGroup_shouldNotReturnNull() throws IOException {
        //act
        Group createdGroup = this.groupService.createGroup(this.groupTravelBindingModel);

        //assert
        Assert.assertNotNull("Group is null after creation", createdGroup);
    }

    @Test
    public void testSaveGroup_givenValidGroup_shouldSetStatusToOpen() throws IOException {
        //act
        Group createdGroup = this.groupService.createGroup(this.groupTravelBindingModel);

        //assert
        Assert.assertEquals("Group is null after creation",
                createdGroup.getStatus(), GroupStatus.OPEN.getStatusName());
    }

    @Test
    public void testSaveGroup_givenValidGroup_shouldReturnGroupWithNoFollowersAndNoStories() throws IOException {
        //act
        Group createdGroup = this.groupService.createGroup(this.groupTravelBindingModel);

        //assert
        Assert.assertEquals("Group followers are not zero after creation",
                createdGroup.getFollowers(),
                new HashSet<User>());

        Assert.assertEquals("Group stories are not zero after creation",
                createdGroup.getStories(),
                new HashSet<Story>());
    }

    @Test
    public void testLoadGroupByName_givenValidGroup_shouldReturnGroup() {
        //act
        Group loadedGroup = this.mockedGroupRepository.findGroupByName(travel.getName());

        //assert
        Assert.assertNotNull("Group is null when loaded by name", loadedGroup);
        Assert.assertEquals("Wrong group when loaded by name", travel.toString(), loadedGroup.toString());
    }

    @Test
    public void testLoadGroupById_givenValidGroup_shouldReturnGroup() {
        //act
        Group loadedGroup = this.mockedGroupRepository.findGroupById(travel.getId());

        //assert
        Assert.assertNotNull("Group is null when loaded by name", loadedGroup);
        Assert.assertEquals("Wrong group when loaded by name", travel.toString(), loadedGroup.toString());
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testLoadGroupById_givenNotValidId_shouldThrowResourceNotFoundException() {
        //act
        this.groupService.findGroupById(12L);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testLoadGroupByName_givenNotValidName_shouldThrowResourceNotFoundException() {
        //act
        this.groupService.findGroupByName("wrongName");
    }

    @Test
    public void testLoadGroup_givenValidGroup_shouldMapGettersFieldsCorrectly() {
        //act
        Group loadedGroup = this.mockedGroupRepository.findGroupById(travel.getId());

        //assert
        Assert.assertEquals("Name is not mapped correctly",
                "Travel" ,loadedGroup.getName());
        Assert.assertEquals("Info is not mapped correctly",
                "This is the group for all travellers" , loadedGroup.getInfo());
    }

    @Test
    public void testGroupStatusChange_shouldChangeStatusToArchive() {
        //act
        Group loadedGroup = this.mockedGroupRepository.findGroupById(travel.getId());
        loadedGroup.setStatus(GroupStatus.ARCHIVED.getStatusName());
        //assert
        Assert.assertEquals("Wrong status after change is benn accepted",
                loadedGroup.getStatus(), GroupStatus.ARCHIVED.getStatusName());
    }

    @Test
    public void testGroupStatusChange_shouldChangeStatusToOpenAfterArchive() {
        //act
        Group loadedGroup = this.mockedGroupRepository.findGroupById(travel.getId());
        loadedGroup.setStatus(GroupStatus.ARCHIVED.getStatusName());
        loadedGroup.setStatus(GroupStatus.OPEN.getStatusName());
        //assert
        Assert.assertEquals("Wrong status after change is benn accepted",
                loadedGroup.getStatus(), GroupStatus.OPEN.getStatusName());
    }
}
