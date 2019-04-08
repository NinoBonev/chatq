package com.nbonev.chatq.sections.users.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.groups.repositories.GroupRepository;
import com.nbonev.chatq.sections.roles.enums.RoleEnum;
import com.nbonev.chatq.sections.roles.repositories.RoleRepository;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.models.binding.UserRegisterBindingModel;
import com.nbonev.chatq.sections.users.models.view.UserViewModel;
import com.nbonev.chatq.sections.users.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by Nino Bonev - 24.3.2019 г., 12:04
 */

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final GroupRepository groupRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
                           GroupRepository groupRepository, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.groupRepository = groupRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    @Override
    public User saveUser(UserRegisterBindingModel userDTO) throws IOException {
        userDTO.uploadAndSetAvatar();
        // Creating user's account
        User user = this.modelMapper.map(userDTO, User.class);

        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        user.setAuthorities(Stream.of(roleRepository.findByRole(RoleEnum.USER.getRoleName())).collect(Collectors.toSet()));

        return this.userRepository.save(user);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return this.userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return this.userRepository.existsByEmail(email);
    }

    @Override
    public void startFollowingGroup(String username, String group_name) {
        User user = this.userRepository.findByUsername(username);
        Group group = this.groupRepository.findByName(group_name);

        user.startFollowingGroup(group);

        this.userRepository.save(user);
        this.groupRepository.save(group);
    }

    @Override
    public void stopFollowingGroup(String username, String group_name) {
        User user = this.userRepository.findByUsername(username);
        Group group = this.groupRepository.findByName(group_name);

        user.stopFollowingGroup(group);

        this.userRepository.save(user);
        this.groupRepository.save(group);
    }

    @Override
    public void startFollowingUser(String myUsername, String followed_username) {
        User myUserOptional = this.userRepository.findByUsername(myUsername);
        User followedUserOptional = this.userRepository.findByUsername(followed_username);

        myUserOptional.startFollowingUser(followedUserOptional);

        this.userRepository.save(myUserOptional);
        this.userRepository.save(followedUserOptional);
    }

    @Override
    public void stopFollowingUser(String myUsername, String followed_username) {
        User myUserOptional = this.userRepository.findByUsername(myUsername);
        User followedUserOptional = this.userRepository.findByUsername(followed_username);

        myUserOptional.stopFollowingUser(followedUserOptional);

        this.userRepository.save(myUserOptional);
        this.userRepository.save(followedUserOptional);
    }

    @Override
    public User findUserByUsername(String username) {
        User user = this.userRepository.findByUsername(username);

        if (user == null) {
            throw new ResourceNotFoundException("User", "username", username);
        }

        return user;
    }

    @Override
    public UserViewModel getUserViewDTOByUsername(String username) {
        User user = this.userRepository.findByUsername(username);

        UserViewModel userViewModel = this.modelMapper.map(user, UserViewModel.class);

        Set<Long> challengesById = new HashSet<>();
        user.getStories().forEach(story -> {
            if (story.getChallenge() != null) {
                challengesById.add(story.getId());
            }
        });

        userViewModel.setChallengesById(challengesById);

        Set<Long> storiesById = new HashSet<>();
        user.getStories().forEach(story -> {
            if (story.getGroup() != null) {
                storiesById.add(story.getId());
            }
        });

        List<String> roles = new ArrayList<>();
        user.getAuthorities().forEach(auth -> roles.add(auth.getAuthority()));

        userViewModel.setStoriesById(storiesById);

        userViewModel.setCommentsById(user.getComments().stream().map(Comment::getId).collect(Collectors.toSet()));
        userViewModel.setFollowingUsersByUsername(user.getFollowingUsers().stream().map(User::getUsername).collect(Collectors.toSet()));
        userViewModel.setFollowingGroupsByName(user.getFollowingGroups().stream().map(Group::getName).collect(Collectors.toSet()));
        userViewModel.setFollowersByUsername(user.getFollowers().stream().map(User::getUsername).collect(Collectors.toSet()));
        userViewModel.setRoles(roles);

        return userViewModel;
    }

    @Override
    public List<UserViewModel> getAllUsersViewDTOs() {
        List<User> allUsers = this.userRepository.findAll();

        List<UserViewModel> userViewModels = new ArrayList<>();

        allUsers.forEach(user -> {
            UserViewModel userViewModel = this.modelMapper.map(user, UserViewModel.class);

            Set<Long> challengesById = new HashSet<>();
            user.getStories().forEach(story -> {
                if (story.getChallenge() != null) {
                    challengesById.add(story.getId());
                }
            });

            userViewModel.setChallengesById(challengesById);

            Set<Long> storiesById = new HashSet<>();
            user.getStories().forEach(story -> {
                if (story.getGroup() != null) {
                    storiesById.add(story.getId());
                }
            });

            userViewModel.setStoriesById(storiesById);

            userViewModel.setCommentsById(user.getComments().stream().map(Comment::getId).collect(Collectors.toSet()));
            userViewModel.setFollowingUsersByUsername(user.getFollowingUsers().stream().map(User::getUsername).collect(Collectors.toSet()));
            userViewModel.setFollowingGroupsByName(user.getFollowingGroups().stream().map(Group::getName).collect(Collectors.toSet()));
            userViewModel.setFollowersByUsername(user.getFollowers().stream().map(User::getUsername).collect(Collectors.toSet()));

            userViewModels.add(userViewModel);
        });

        return userViewModels;
    }
}

