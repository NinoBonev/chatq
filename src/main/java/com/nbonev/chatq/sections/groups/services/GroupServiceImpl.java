package com.nbonev.chatq.sections.groups.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.groups.enums.GroupStatus;
import com.nbonev.chatq.sections.groups.models.binding.GroupCreateBindingModel;
import com.nbonev.chatq.sections.groups.models.view.GroupViewModel;
import com.nbonev.chatq.sections.groups.repositories.GroupRepository;
import com.nbonev.chatq.sections.groups.utils.Constants;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.users.entities.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Nino Bonev - 24.3.2019 г., 15:44
 */

@Service
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public GroupServiceImpl(GroupRepository groupRepository, ModelMapper modelMapper) {
        this.groupRepository = groupRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Group createGroup(GroupCreateBindingModel groupCreateBindingModel) throws IOException {

        groupCreateBindingModel.uploadAndSetCover();
        groupCreateBindingModel.setStatus(GroupStatus.OPEN.getStatusName());

        Group group = modelMapper.map(groupCreateBindingModel, Group.class);

        return this.groupRepository.save(group);
    }

    @Override
    public List<Group> findAllGroups() {
        return this.groupRepository.findAll();
    }

    @Override
    public List<GroupViewModel> getAllGroupsDTO() {
        List<Group> all = this.findAllGroups();

        return all.stream()
                .map(gr -> {
                            GroupViewModel groupViewModel = this.modelMapper.map(gr, GroupViewModel.class);
                            groupViewModel.setStoriesById(gr.getStories().stream().map(Story::getId).collect(Collectors.toSet()));
                            groupViewModel.setFollowersByUsername(gr.getFollowers().stream().map(User::getUsername).collect(Collectors.toSet()));
                            return groupViewModel;
                        }
                ).collect(Collectors.toList());
    }

    @Override
    public Group findGroupByName(String name) {
        Group group = this.groupRepository.findGroupByName(name);
        if (group == null) {
            throw new ResourceNotFoundException("Group", "name", name);
        }

        return group;

    }

    @Override
    public Group findGroupById(Long id) {
        Group group = this.groupRepository.findGroupById(id);
        if (group == null) {
            throw new ResourceNotFoundException("Group", "id", id);
        }

        return group;
    }

    @Override
    public GroupViewModel getGroupDTOByName(String name) {
        Group group = this.findGroupByName(name);

        GroupViewModel groupViewModel = this.modelMapper.map(group, GroupViewModel.class);
        groupViewModel.setStoriesById(group.getStories().stream().map(Story::getId).collect(Collectors.toSet()));
        groupViewModel.setFollowersByUsername(group.getFollowers().stream().map(User::getUsername).collect(Collectors.toSet()));

        return groupViewModel;
    }

    @Override
    public void archiveGroup(Long id) {
        Group group = this.findGroupById(id);

        group.setStatus(GroupStatus.ARCHIVED.getStatusName());

        this.groupRepository.save(group);
    }

    @Override
    public void closeGroup(Long id) {
        Group group = this.findGroupById(id);

        group.setStatus(GroupStatus.CLOSED.getStatusName());

        this.groupRepository.save(group);
    }

    @Override
    public void openGroup(Long id) {
        Group group = this.findGroupById(id);

        group.setStatus(GroupStatus.OPEN.getStatusName());

        this.groupRepository.save(group);
    }
}
