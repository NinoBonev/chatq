package com.nbonev.chatq.sections.stories.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.nbonev.chatq.sections.audit.DateAudit;
import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.storylines.entities.StoryLine;
import com.nbonev.chatq.sections.users.entities.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.*;

/**
 * Created by Nino Bonev - 21.3.2019 г., 12:32
 */

@Entity
@Table(name = "stories")
public class Story extends DateAudit {

    @Id
    @GeneratedValue
    private long id;

    @NotBlank
    @Size(min = 6, max = 300)
    //TODO @Column(unique = true) ???
    private String name;

    @NotBlank
    @Size(min = 25, max = 12000)
    private String info;

    @NotBlank
    private String cover;

    @JsonBackReference(value="user-stories")
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonBackReference(value="group-stories")
    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "id")
    private Group group;

    @JsonBackReference(value="challenge-stories")
    @ManyToOne
    @JoinColumn(name = "challenge_id", referencedColumnName = "id")
    private Challenge challenge;

    @JsonManagedReference(value="story-storyline")
    @OneToMany(mappedBy = "story", targetEntity = StoryLine.class, cascade = CascadeType.REMOVE)
    private LinkedHashSet<StoryLine> storylines = new LinkedHashSet<>();

    @JsonManagedReference(value="story-comments")
    @OneToMany(mappedBy = "story", targetEntity = Comment.class, cascade = CascadeType.REMOVE)
    private Set<Comment> comments = new HashSet<>();

    public Story() {
    }

    public Story(String name, String info, String cover) {
        this.name = name;
        this.info = info;
        this.cover = cover;
    }

    public Story(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public LinkedHashSet<StoryLine> getStoryLine() {
        return storylines;
    }

    public void setStoryLine(LinkedHashSet<StoryLine> storylines) {
        this.storylines = storylines;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
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

    public Challenge getChallenge() {
        return challenge;
    }

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
    }
}
