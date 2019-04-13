package com.nbonev.chatq.sections.challenges.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.nbonev.chatq.sections.audit.DateAudit;
import com.nbonev.chatq.sections.challenges.utils.Constants;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.users.entities.User;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;

/**
 * Created by Nino Bonev - 21.3.2019 г., 12:33
 */

@Entity
@Table(name = "challenges")
public class Challenge extends DateAudit {

    @Id
    @GeneratedValue
    private long id;

    @NotBlank
    @Size(min = 6, max = 300)
    private String name;

    @NotBlank
    @Size(min = 10, max = 12000)
    private String info;

    @NotBlank
    private String cover;

    @DateTimeFormat
    private Instant deadlineDate;

    private String status;

    @JsonManagedReference(value="challenge-stories")
    @OneToMany(mappedBy = "challenge", targetEntity = Story.class, cascade = CascadeType.REMOVE)
    private Set<Story> stories;

    public Challenge() {
    }

    public Challenge(String name, String info, String cover, Instant deadlineDate, String status) {
        this.name = name;
        this.info = info;
        this.cover = cover;
        this.deadlineDate = deadlineDate;
        this.status = status;
    }

    public Challenge(String name) {
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

    public Instant getDeadlineDate() {
        return deadlineDate;
    }

    public void setDeadlineDate(Instant deadlineDate) {
        this.deadlineDate = deadlineDate;
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

        this.setStories(currentStories);
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
