package com.nbonev.chatq.entity;

import com.cloudinary.StoredFile;
import com.nbonev.chatq.entity.audit.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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
    @Size(max = 40)
    private String name;

    @NotBlank
    @Size(max = 15)
    private String username;

    @NaturalId
    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;

    @NotBlank
    @URL
    private String avatar;

//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "following_user_relation",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "following_user_id"))
//    private Set<User> followingUsers = new HashSet<>();
//
//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "following_group_relation",
//            joinColumns = @JoinColumn(name = "group_id"),
//            inverseJoinColumns = @JoinColumn(name = "following_group_id"))
//    private Set<Group> followingGroups = new HashSet<>();
//
//    @ManyToMany(mappedBy = "following_user")
//    private Set<User> followers;

//    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
//    private Set<Comment> comments = new HashSet<>();

//    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL)
//    private Set<Story> stories = new HashSet<>();
//
//    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
//    private Set<Challenge> challenges = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

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

//    public Set<User> getFollowingUsers() {
//        return followingUsers;
//    }
//
//    public void setFollowingUsers(Set<User> followingUsers) {
//        this.followingUsers = followingUsers;
//    }
//
//    public Set<Group> getFollowingGroups() {
//        return followingGroups;
//    }
//
//    public void setFollowingGroups(Set<Group> followingGroups) {
//        this.followingGroups = followingGroups;
//    }
//
//    public Set<User> getFollowers() {
//        return followers;
//    }
//
//    public void setFollowers(Set<User> followers) {
//        this.followers = followers;
//    }

//    public Set<Comment> getComments() {
//        return comments;
//    }
//
//    public void setComments(Set<Comment> comments) {
//        this.comments = comments;
//    }

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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public StoredFile getUpload() {
        StoredFile file = new StoredFile();
        file.setPreloadedFile(avatar);
        return file;
    }

    public void setUpload(StoredFile file) {
        this.avatar = file.getPreloadedFile();
    }

}