package com.nbonev.chatq.sections.storylines.models.view;

import java.time.Instant;

/**
 * Created by Nino Bonev - 25.3.2019 г., 15:36
 */
public class StoryLineViewModel {

    private long id;
    private String info;
    private String cover;
    private Instant createdAt;
    private Long storyId;

    public StoryLineViewModel() {
    }

    public StoryLineViewModel(long id, String info, String cover, Long storyId, Instant createdAt) {
        this.id = id;
        this.info = info;
        this.cover = cover;
        this.storyId = storyId;
        this.createdAt = createdAt;
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

    public Long getStoryId() {
        return storyId;
    }

    public void setStoryId(Long storyId) {
        this.storyId = storyId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
