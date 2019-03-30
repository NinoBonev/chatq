package com.nbonev.chatq.security;

import java.util.List;
import java.util.Set;

/**
 * Created by Nino Bonev - 30.3.2019 г., 9:16
 */
public class JwtClaimUserProfile {

    private Long id;
    private String name;
    private String username;
    private String avatar;
    private List<String> roles;
    private Set<Long> myStoriesById;
    private Set<Long> myChallengesById;
    private Set<Long> myCommentsById;
    private Set<String> followingUsersByUsername;
    private Set<String> followersByUsername;
    private Set<String> followingGroupsByName;

    public JwtClaimUserProfile(Long id, String name, String username, String avatar, List<String> roles,
                               Set<Long> myChallengesById, Set<Long> myStoriesById, Set<Long> myCommentsById,
                               Set<String> followingUsersByUsername, Set<String> followersByUsername,
                               Set<String> followingGroupsByName) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.avatar = avatar;
        this.roles = roles;
        this.myChallengesById = myChallengesById;
        this.myStoriesById = myStoriesById;
        this.myCommentsById = myCommentsById;
        this.followingUsersByUsername = followingUsersByUsername;
        this.followersByUsername = followersByUsername;
        this.followingGroupsByName = followingGroupsByName;
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

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public Set<Long> getMyStoriesById() {
        return myStoriesById;
    }

    public void setMyStoriesById(Set<Long> myStoriesById) {
        this.myStoriesById = myStoriesById;
    }

    public Set<Long> getMyChallengesById() {
        return myChallengesById;
    }

    public void setMyChallengesById(Set<Long> myChallengesById) {
        this.myChallengesById = myChallengesById;
    }

    public Set<Long> getMyCommentsById() {
        return myCommentsById;
    }

    public void setMyCommentsById(Set<Long> myCommentsById) {
        this.myCommentsById = myCommentsById;
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
}
