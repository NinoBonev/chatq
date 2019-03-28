package com.nbonev.chatq.sections.storylines.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.nbonev.chatq.sections.audit.DateAudit;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.stories.entities.Story;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * Created by Nino Bonev - 21.3.2019 г., 12:32
 */

@Entity
@Table(name = "storylines")
public class StoryLine extends DateAudit {

    @Id
    @GeneratedValue
    private long id;

    @NotBlank
    @Size(min = 21, max= 2670000)
    private String info;

    @NotBlank
    private String cover;

    @JsonBackReference(value="story-storyline")
    @ManyToOne(optional = false)
    @JoinColumn(name = "story_id", referencedColumnName = "id")
    private Story story;

    public StoryLine() {
    }

    public StoryLine(String info, String cover, Story story) {
        this.info = info;
        this.cover = cover;
        this.story = story;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Story getStory() {
        return story;
    }

    public void setStory(Story story) {
        this.story = story;
    }
}
