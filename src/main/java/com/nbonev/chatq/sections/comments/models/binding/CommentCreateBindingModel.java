package com.nbonev.chatq.sections.comments.models.binding;

import com.nbonev.chatq.sections.comments.utils.Constants;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * Created by Nino Bonev - 27.3.2019 г., 19:15
 */
public class CommentCreateBindingModel {

    @NotNull
    @NotEmpty(message = Constants.COMMENT_VALUE_VALIDATION)
    private String value;

    @NotNull
    @NotEmpty(message = Constants.COMMENT_AVATAR_VALIDATION)
    private String avatar;

    @NotNull(message = Constants.COMMENT_USER_ID_VALIDATION)
    private Long userId;

    @NotNull(message = Constants.COMMENT_STORY_ID_VALIDATION)
    private Long storyId;

    public CommentCreateBindingModel() {
    }

    public CommentCreateBindingModel(String value, String avatar, Long userId, Long storyId) {
        this.value = value;
        this.avatar = avatar;
        this.userId = userId;
        this.storyId = storyId;
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
}
