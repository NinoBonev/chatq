package com.nbonev.chatq.sections.users.models.view;

import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.users.entities.User;

import java.util.List;
import java.util.Set;

/**
 * Created by Nino Bonev - 25.3.2019 г., 19:07
 */


public class UserViewModel {

    private Long id;
    private String name;
    private String username;
    private String avatar;
    private String email;
    private Set<Long> storiesById;
    private Set<Long> challengesById;
    private Set<Long> commentsById;
    private Set<String> followingUsersByUsername;
    private Set<String> followersByUsername;
    private Set<String> followingGroupsByName;
    private List<String> roles;

    public UserViewModel() {
    }

    public UserViewModel(Long id, String name, String username, String avatar, String email,
                         Set<Long> storiesById, Set<Long> challengesById, Set<Long> commentsById,
                         Set<String> followingUsersByUsername, Set<String> followersByUsername,
                         Set<String> followingGroupsByName, List<String> roles) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.avatar = avatar;
        this.email = email;
        this.storiesById = storiesById;
        this.challengesById = challengesById;
        this.commentsById = commentsById;
        this.followingUsersByUsername = followingUsersByUsername;
        this.followersByUsername = followersByUsername;
        this.followingGroupsByName = followingGroupsByName;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Long> getStoriesById() {
        return storiesById;
    }

    public void setStoriesById(Set<Long> storiesById) {
        this.storiesById = storiesById;
    }

    public Set<Long> getChallengesById() {
        return challengesById;
    }

    public void setChallengesById(Set<Long> challengesById) {
        this.challengesById = challengesById;
    }

    public Set<Long> getCommentsById() {
        return commentsById;
    }

    public void setCommentsById(Set<Long> commentsById) {
        this.commentsById = commentsById;
    }

    public Set<String> getFollowingUsersByUsername() {
        return followingUsersByUsername;
    }

    public void setFollowingUsersByUsername(Set<String> followingUsersByUsername) {
        this.followingUsersByUsername = followingUsersByUsername;
    }

    public Set<String> getFollowersByUsername() {
        return followersByUsername;
    }

    public void setFollowersByUsername(Set<String> followersByUsername) {
        this.followersByUsername = followersByUsername;
    }

    public Set<String> getFollowingGroupsByName() {
        return followingGroupsByName;
    }

    public void setFollowingGroupsByName(Set<String> followingGroupsByName) {
        this.followingGroupsByName = followingGroupsByName;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
