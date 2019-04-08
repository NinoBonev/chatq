package com.nbonev.chatq.sections.users.services;

import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.models.binding.UserRegisterBindingModel;
import com.nbonev.chatq.sections.users.models.view.UserViewModel;

import java.io.IOException;
import java.util.List;

/**
 * Created by Nino Bonev - 24.3.2019 г., 12:13
 */

public interface UserService {

    User saveUser(UserRegisterBindingModel userDTO) throws IOException;

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    User findUserByUsername(String username);

    UserViewModel getUserViewDTOByUsername(String username);

    List<UserViewModel> getAllUsersViewDTOs();

    void startFollowingGroup(String username, String group_name);

    void stopFollowingGroup(String username, String group_name);

    void startFollowingUser(String myUsername, String followed_username);

    void stopFollowingUser(String myUsername, String followed_username);
}
