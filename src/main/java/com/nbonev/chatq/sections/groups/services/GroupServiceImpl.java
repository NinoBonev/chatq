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
    public ResponseEntity<ApiResponse> createGroup(GroupCreateBindingModel groupCreateBindingModel) throws IOException {

        groupCreateBindingModel.uploadAndSetCover();
        groupCreateBindingModel.setStatus(GroupStatus.OPEN.getStatusName());

        Group group = modelMapper.map(groupCreateBindingModel, Group.class);
        this.groupRepository.save(group);

        return ResponseEntity.ok().body(new ApiResponse(true, Constants.GROUP_CREATED_SUCCESS));
    }

    @Override
    public List<Group> findAllGroups() {
        return this.groupRepository.findAll();
    }

    @Override
    public List<GroupViewModel> getAllGroupsDTO() {
        List<Group> all = this.groupRepository.findAll();

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
    public Optional<Group> findGroupByName(String name) {
        Optional<Group> groupOptional = this.groupRepository.findByName(name);
        if (!groupOptional.isPresent()) {
            throw new ResourceNotFoundException("Group", "name", name);
        }

        return groupOptional;

    }

    @Override
    public Optional<Group> findGroupById(Long id) {
        Optional<Group> groupOptional = this.groupRepository.findById(id);
        if (!groupOptional.isPresent()) {
            throw new ResourceNotFoundException("Group", "id", id);
        }

        return groupOptional;
    }

    @Override
    public GroupViewModel getGroupDTOByName(String name) {
        Optional<Group> groupOptional = this.groupRepository.findByName(name);

        if (!groupOptional.isPresent()) {
            throw new ResourceNotFoundException("Group", "name", name);
        }

        GroupViewModel groupViewModel = this.modelMapper.map(groupOptional.get(), GroupViewModel.class);
        groupViewModel.setStoriesById(groupOptional.get().getStories().stream().map(Story::getId).collect(Collectors.toSet()));
        groupViewModel.setFollowersByUsername(groupOptional.get().getFollowers().stream().map(User::getUsername).collect(Collectors.toSet()));

        return groupViewModel;
    }

    @Override
    public void archiveGroup(Long id) {
        Optional<Group> optionalGroup = this.groupRepository.findById(id);

        if (!optionalGroup.isPresent()) {
            throw new ResourceNotFoundException("Group", "id", id);
        }

        optionalGroup.get().setStatus(GroupStatus.ARCHIVED.getStatusName());

        this.groupRepository.save(optionalGroup.get());
    }

    @Override
    public void closeGroup(Long id) {
        Optional<Group> optionalGroup = this.groupRepository.findById(id);

        if (!optionalGroup.isPresent()) {
            throw new ResourceNotFoundException("Group", "id", id);
        }

        optionalGroup.get().setStatus(GroupStatus.CLOSED.getStatusName());

        this.groupRepository.save(optionalGroup.get());
    }

    @Override
    public void openGroup(Long id) {
        Optional<Group> optionalGroup = this.groupRepository.findById(id);

        if (!optionalGroup.isPresent()) {
            throw new ResourceNotFoundException("Group", "id", id);
        }

        optionalGroup.get().setStatus(GroupStatus.OPEN.getStatusName());

        this.groupRepository.save(optionalGroup.get());
    }
}
