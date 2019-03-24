package com.nbonev.chatq.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nbonev.chatq.entity.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Nino Bonev - 23.3.2019 г., 10:57
 */
public class UserPrincipal implements UserDetails {
    private Long id;

    private String name;

    private String username;

    private String avatar;

    @JsonIgnore
    private String email;

    @JsonIgnore
    private String password;

//    private Set<Story> stories;
//
//    private Set<Challenge> challenges;
//
//    private Set<Comment> comments;

    private Set<User> followingUsers;

    private Set<User> followers;

 //   private Set<Group> followingGroups;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Long id, String name, String username, String avatar, String email, String password,
//                         Set<Story> stories, Set<Challenge> challenges,
 //                        Set<Comment> comments,
//                         Set<User> followingUsers, Set<User> followers,Set<Group> followingGroups,
                         Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.avatar = avatar;
        this.email = email;
        this.password = password;
//        this.stories = stories;
//        this.challenges = challenges;
   //     this.comments = comments;
//        this.followingUsers = followingUsers;
//        this.followers = followers;
//        this.followingGroups = followingGroups;
        this.authorities = authorities;
    }
    public static UserPrincipal create(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                new SimpleGrantedAuthority(role.getName().name())
        ).collect(Collectors.toList());

        return new UserPrincipal(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getAvatar(),
                user.getEmail(),
                user.getPassword(),
//                user.getStories(),
//                user.getChallenges(),
                //user.getComments(),
//                user.getFollowingUsers(),
//                user.getFollowers(),
//                user.getFollowingGroups(),
                authorities
        );
    }

    public String getAvatar() {
        return avatar;
    }

//    public Set<Story> getStories() {
//        return stories;
//    }
//
//    public Set<Challenge> getChallenges() {
//        return challenges;
//    }
//
//    public Set<Comment> getComments() {
//        return comments;
//    }

    public Set<User> getFollowingUsers() {
        return followingUsers;
    }

    public Set<User> getFollowers() {
        return followers;
    }

//    public Set<Group> getFollowingGroups() {
//        return followingGroups;
//    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }
}
