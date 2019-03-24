package com.nbonev.chatq.payload;

import com.nbonev.chatq.entity.*;

import java.util.Set;

/**
 * Created by Nino Bonev - 23.3.2019 г., 12:16
 */
public class UserProfile {

    private Long id;
    private String name;
    private String username;
    private String avatar;
    private String email;
//    private Set<Story> stories;
//    private Set<Challenge> challenges;
//    private Set<Comment> comments;
    private Set<User> followingUsers;
    private Set<User> followers;
//    private Set<Group> followingGroups;

    public UserProfile(Long id, String name, String username, String avatar, String email)
//                       Set<Story> stories, Set<Challenge> challenges,
     //                  Set<Comment> comments
//                       Set<User> followingUsers, Set<User> followers, Set<Group> followingGroups)
    {
        this.id = id;
        this.name = name;
        this.username = username;
        this.avatar = avatar;
        this.email = email;
//        this.stories = stories;
//        this.challenges = challenges;
   //     this.comments = comments;
//        this.followingUsers = followingUsers;
//        this.followers = followers;
//        this.followingGroups = followingGroups;
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

//    public Set<Story> getStories() {
//        return stories;
//    }
//
//    public void setStories(Set<Story> stories) {
//        this.stories = stories;
//    }
//
//    public Set<Challenge> getChallenges() {
//        return challenges;
//    }
//
//    public void setChallenges(Set<Challenge> challenges) {
//        this.challenges = challenges;
//    }
//
//    public Set<Comment> getComments() {
//        return comments;
//    }
//
//    public void setComments(Set<Comment> comments) {
//        this.comments = comments;
//    }

//    public Set<User> getFollowingUsers() {
//        return followingUsers;
//    }
//
//    public void setFollowingUsers(Set<User> followingUsers) {
//        this.followingUsers = followingUsers;
//    }
//
//    public Set<User> getFollowers() {
//        return followers;
//    }
//
//    public void setFollowers(Set<User> followers) {
//        this.followers = followers;
//    }
//
//    public Set<Group> getFollowingGroups() {
//        return followingGroups;
//    }
//
//    public void setFollowingGroups(Set<Group> followingGroups) {
//        this.followingGroups = followingGroups;
//    }
}
