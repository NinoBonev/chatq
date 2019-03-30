package com.nbonev.chatq.sections.groups.services;

import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.groups.models.binding.GroupCreateBindingModel;
import com.nbonev.chatq.sections.groups.models.view.GroupViewModel;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * Created by Nino Bonev - 24.3.2019 г., 15:37
 */
public interface GroupService {

    ResponseEntity<ApiResponse> createGroup(GroupCreateBindingModel groupCreateBindingModel) throws IOException;

    List<Group> findAllGroups();

    List<GroupViewModel> getAllGroupsDTO();

    Optional<Group> findGroupByName(String name);

    Optional<Group> findGroupById(Long id);

    GroupViewModel getGroupDTOByName(String name);

    void archiveGroup(Long id);

    void closeGroup(Long id);

    void openGroup(Long id);

}
