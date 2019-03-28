package com.nbonev.chatq.sections.users.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.groups.repositories.GroupRepository;
import com.nbonev.chatq.sections.roles.enums.RoleEnum;
import com.nbonev.chatq.sections.roles.repositories.RoleRepository;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.models.binding.UserRegisterBindingModel;
import com.nbonev.chatq.sections.users.models.view.UserViewModel;
import com.nbonev.chatq.sections.users.repositories.UserRepository;
import com.nbonev.chatq.sections.users.utils.Constants;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ApiResponse> saveUser(UserRegisterBindingModel userDTO) throws IOException {

        if (this.userRepository.existsByUsername(userDTO.getUsername())) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, Constants.USERNAME_TAKEN));
        }

        if (this.userRepository.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, Constants.EMAIL_TAKEN));
        }

        //Uploading user's avatar to Cloudinary
        userDTO.uploadAndSetAvatar(userDTO.getAvatar());

        // Creating user's account
        User user = this.modelMapper.map(userDTO, User.class);

        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        user.setAuthorities(Stream.of(roleRepository.findByRole(RoleEnum.USER.getRoleName())).collect(Collectors.toSet()));
        user.setAdmin(false);

        this.userRepository.save(user);

        return ResponseEntity.ok().body(new ApiResponse(true, Constants.USER_CREATED_SUCCESS));
    }

    @Override
    public ResponseEntity<ApiResponse> startFollowingGroup(String username, String group_name) {
        Optional<User> userOptional = this.userRepository.findByUsername(username);
        Optional<Group> groupOption = this.groupRepository.findByName(group_name);

        if (!userOptional.isPresent()) {
            throw new ResourceNotFoundException("User", "username", username);
        }

        if (!groupOption.isPresent()) {
            throw new ResourceNotFoundException("Group", "name", group_name);
        }

        userOptional.get().setFollowingGroups(Collections.singleton(groupOption.get()));
        groupOption.get().setFollowers(Collections.singleton(userOptional.get()));
        this.userRepository.save(userOptional.get());
        this.groupRepository.save(groupOption.get());

        return ResponseEntity.ok().body(new ApiResponse(true, String.format(Constants.GROUP_FOLLOW_SUCCESS, groupOption.get().getName())));
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        Optional<User> optionalUser = this.userRepository.findByUsername(username);

        if (!optionalUser.isPresent()) {
            throw new ResourceNotFoundException("Group", "username", username);
        }

        return optionalUser;
    }

    @Override
    public UserViewModel getUserViewDTOByUsername(String username) {
        Optional<User> optionalUser = this.userRepository.findByUsername(username);

        if (!optionalUser.isPresent()) {
            throw new ResourceNotFoundException("Group", "username", username);
        }

        User user = optionalUser.get();
        UserViewModel userViewModel = this.modelMapper.map(user, UserViewModel.class);

        Set<Long> challengesById = new HashSet<>();
        user.getStories().forEach(story -> {
            if (story.getChallenge() != null){
                challengesById.add(story.getId());
            }
        });

        userViewModel.setChallengesById(challengesById);

        Set<Long> storiesById = new HashSet<>();
        user.getStories().forEach(story -> {
            if (story.getGroup() != null){
                storiesById.add(story.getId());
            }
        });

        userViewModel.setStoriesById(storiesById);

        userViewModel.setCommentsById(user.getComments().stream().map(Comment::getId).collect(Collectors.toSet()));
        userViewModel.setFollowingUsersByUsername(user.getFollowingUsers().stream().map(User::getUsername).collect(Collectors.toSet()));
        userViewModel.setFollowingGroupsByName(user.getFollowingGroups().stream().map(Group::getName).collect(Collectors.toSet()));
        userViewModel.setFollowersByUsername(user.getFollowers().stream().map(User::getUsername).collect(Collectors.toSet()));

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
                if (story.getChallenge() != null){
                    challengesById.add(story.getId());
                }
            });

            userViewModel.setChallengesById(challengesById);

            Set<Long> storiesById = new HashSet<>();
            user.getStories().forEach(story -> {
                if (story.getGroup() != null){
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

