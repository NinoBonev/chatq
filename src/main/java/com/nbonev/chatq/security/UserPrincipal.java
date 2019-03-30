package com.nbonev.chatq.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.users.entities.User;
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

    @JsonIgnore
    private String email;

    @JsonIgnore
    private String password;

    private String avatar;

    private Set<User> followingUsers;

    private Set<Group> followingGroups;

    private Set<User> followers;

    private Set<Comment> comments;

    private Set<Story> stories;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Long id, String name, String username, String email, String password, String avatar,
                         Set<User> followingUsers, Set<Group> followingGroups ,Set<User> followers,
                         Set<Comment> comments, Set<Story> stories,
                         Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.avatar = avatar;
        this.email = email;
        this.password = password;
        this.stories = stories;
        this.comments = comments;
        this.followingUsers = followingUsers;
        this.followers = followers;
        this.followingGroups = followingGroups;
        this.authorities = authorities;
    }
    public static UserPrincipal create(User user) {
        List<GrantedAuthority> authorities = user.getAuthorities().stream().map(authority ->
                new SimpleGrantedAuthority(authority.getAuthority())
        ).collect(Collectors.toList());

        return new UserPrincipal(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getAvatar(),
                user.getFollowingUsers(),
                user.getFollowingGroups(),
                user.getFollowers(),
                user.getComments(),
                user.getStories(),
                authorities
        );
    }

    public String getAvatar() {
        return avatar;
    }

    public Set<Story> getStories() {
        return stories;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Set<User> getFollowingUsers() {
        return followingUsers;
    }

    public Set<User> getFollowers() {
        return followers;
    }

    public Set<Group> getFollowingGroups() {
        return followingGroups;
    }

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
