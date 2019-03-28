package com.nbonev.chatq.sections.comments.models.view;

import java.time.Instant;

/**
 * Created by Nino Bonev - 27.3.2019 г., 19:15
 */
public class CommentViewModel {

    private long id;
    private String value;
    private Instant createdAt;
    private String avatar;
    private String createdBy;
    private Long userId;
    private Long storyId;

    public CommentViewModel() {
    }

    public CommentViewModel(Long id, String value, Instant createdAt, String avatar, String createdBy, Long userId, Long storyId) {
        this.id = id;
        this.value = value;
        this.createdAt = createdAt;
        this.avatar = avatar;
        this.createdBy = createdBy;
        this.userId = userId;
        this.storyId = storyId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getStoryId() {
        return storyId;
    }

    public void setStoryId(Long storyId) {
        this.storyId = storyId;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
