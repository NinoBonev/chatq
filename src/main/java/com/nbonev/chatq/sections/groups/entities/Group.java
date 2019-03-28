package com.nbonev.chatq.sections.groups.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.nbonev.chatq.sections.audit.DateAudit;
import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.users.entities.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Nino Bonev - 21.3.2019 г., 12:33
 */

@Entity
@Table(name = "groups")
public class Group extends DateAudit {

    @Id
    @GeneratedValue
    private long id;

    @NotBlank
    @Size(min = 4, max = 15)
    private String name;

    @NotBlank
    @Size(min = 10, max = 600)
    private String info;

    @NotBlank
    private String cover;

    @JsonManagedReference(value="group-stories")
    @OneToMany(mappedBy = "group", targetEntity = Story.class, cascade = CascadeType.REMOVE)
    private Set<Story> stories;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "following_followers_group",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> followers;

    public Group() {
    }

    public Group(String name, String info, String cover) {
        this.name = name;
        this.info = info;
        this.cover = cover;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Set<User> getFollowers() {
        return followers;
    }

    public void setFollowers(Set<User> followers) {
        this.followers = followers;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
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
}
