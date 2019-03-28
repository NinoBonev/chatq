package com.nbonev.chatq.sections.users.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.roles.entities.Role;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.audit.DateAudit;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.URL;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Nino Bonev - 21.3.2019 г., 12:32
 */

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
        }),
        @UniqueConstraint(columnNames = {
                "email"
        })
})
public class User extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 4, max = 40)
    private String name;

    @NotBlank
    @Size(min = 4, max = 15)
    private String username;

    @NaturalId
    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    @URL
    private String avatar;

    @ManyToMany(mappedBy = "followers")
    private Set<User> followingUsers = new HashSet<>();

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "following_followers_group",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    private Set<Group> followingGroups;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "User_Relations",
            joinColumns = @JoinColumn(name = "Followed_Id"),
            inverseJoinColumns = @JoinColumn(name = "Following_Id"))
    private Set<User> followers;

    @JsonManagedReference(value="user-comments")
    @OneToMany(mappedBy = "user", targetEntity = Comment.class, cascade = CascadeType.REMOVE)
    private Set<Comment> comments;

    @JsonManagedReference(value="user-stories")
    @OneToMany(mappedBy = "user", targetEntity = Story.class, cascade = CascadeType.REMOVE)
    private Set<Story> stories;

//    @JsonManagedReference(value="user-stories")
//    @OneToMany(mappedBy = "user", targetEntity = Story.class, cascade = CascadeType.REMOVE)
//    private Set<Story> challenges;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> authorities;

    private Boolean isAdmin;

    public User() {
    }

    public User(String name, String username, String email, String password, String avatar) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Set<User> getFollowingUsers() {
        return followingUsers;
    }

    public void setFollowingUsers(Set<User> followingUsers) {
        this.followingUsers = followingUsers;
    }

    public void addFollowingUsers(User followed) {
        followed.addFollower(this);
    }

    public Set<Group> getFollowingGroups() {
        return followingGroups;
    }

    public void setFollowingGroups(Set<Group> followingGroups) {
        this.followingGroups = followingGroups;
    }

    public Set<User> getFollowers() {
        return followers;
    }

    public void setFollowers(Set<User> followers) {
        this.followers = followers;
    }

    public void addFollower(User follower) {
        this.followers.add(follower);
        follower.followingUsers.add(this);
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public void addComment(Comment comment) {
        Set<Comment> currentComments = this.comments;
        currentComments.add(comment);

        this.comments = currentComments;
    }

    public Set<Story> getStories() {
        return stories;
    }

    public void setStories(Set<Story> stories) {
        this.stories = stories;
    }

    public void addStory(Story story) {
        Set<Story> currentStories = this.stories;
        currentStories.add(story);

        this.stories = currentStories;
    }

//    public Set<Story> getChallenges() {
//        return challenges;
//    }
//
//    public void setChallenges(Set<Story> challenges) {
//        this.challenges = challenges;
//    }
//
//    public void addChallenge(Story challenge) {
//        Set<Story> currentChallenges = this.challenges;
//        currentChallenges.add(challenge);
//
//        this.challenges = currentChallenges;
//    }

    public Set<Role> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Role> roles) {
        this.authorities = roles;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }


}