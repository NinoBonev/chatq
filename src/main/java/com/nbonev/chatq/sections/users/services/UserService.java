package com.nbonev.chatq.sections.users.services;

import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.models.binding.UserRegisterBindingModel;
import com.nbonev.chatq.sections.users.models.view.UserViewModel;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * Created by Nino Bonev - 24.3.2019 г., 12:13
 */

public interface UserService {

    ResponseEntity<ApiResponse> saveUser(UserRegisterBindingModel userDTO) throws IOException;

    ResponseEntity<ApiResponse> startFollowingGroup(String username, String group_name);

    Optional<User> findUserByUsername(String username);

    UserViewModel getUserViewDTOByUsername(String username);

    List<UserViewModel> getAllUsersViewDTOs();
}
