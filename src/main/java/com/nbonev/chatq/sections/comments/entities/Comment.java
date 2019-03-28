package com.nbonev.chatq.sections.comments.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.nbonev.chatq.sections.audit.DateAudit;
import com.nbonev.chatq.sections.audit.UserDateAudit;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.users.entities.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

/**
 * Created by Nino Bonev - 21.3.2019 г., 12:33
 */

@Entity
@Table(name = "comments")
public class Comment extends DateAudit {

    @Id
    @GeneratedValue
    private long id;

    @NotBlank
    private String value;

    @NotBlank
    private String avatar;

    @JsonBackReference(value="user-comments")
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonBackReference(value="story-comments")
    @ManyToOne(optional = false)
    @JoinColumn(name = "story_id", referencedColumnName = "id")
    private Story story;

    public Comment() {
    }

    public Comment(@NotBlank String value, @NotBlank String avatar, User user, Story story) {
        this.value = value;
        this.avatar = avatar;
        this.user = user;
        this.story = story;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Story getStory() {
        return story;
    }

    public void setStory(Story story) {
        this.story = story;
    }
}
