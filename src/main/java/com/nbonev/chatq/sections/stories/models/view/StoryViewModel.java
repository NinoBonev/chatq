package com.nbonev.chatq.sections.stories.models.view;

import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.storylines.entities.StoryLine;

import java.time.Instant;
import java.util.Set;

/**
 * Created by Nino Bonev - 25.3.2019 г., 15:33
 */
public class StoryViewModel {

    private long id;
    private String name;
    private String info;
    private String cover;
    private Long userId;
    private String username;
    private Long groupId;
    private String group_name;
    private Long challengeId;
    private String challenge_name;
    private Instant createdAt;
    private Set<StoryLine> storylines;
    private Set<Comment> comments;

    public StoryViewModel() {
    }

    public StoryViewModel(long id, String name, String info, String cover,
                          Instant createdAt, Long userId, String username, Long groupId,
                          Long challengeId, String challenge_name,
                          String group_name, Set<StoryLine> storylines, Set<Comment> comments) {
        this.id = id;
        this.name = name;
        this.info = info;
        this.cover = cover;
        this.userId = userId;
        this.username = username;
        this.groupId = groupId;
        this.group_name = group_name;
        this.challengeId = challengeId;
        this.challenge_name = challenge_name;
        this.storylines = storylines;
        this.createdAt = createdAt;
        this.comments = comments;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public String getGroup_name() {
        return group_name;
    }

    public void setGroup_name(String group_name) {
        this.group_name = group_name;
    }

    public Set<StoryLine> getStoryLine() {
        return storylines;
    }

    public void setStoryLine(Set<StoryLine> storylines) {
        this.storylines = storylines;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Long getChallengeId() {
        return challengeId;
    }

    public void setChallengeId(Long challengeId) {
        this.challengeId = challengeId;
    }

    public String getChallenge_name() {
        return challenge_name;
    }

    public void setChallenge_name(String challenge_name) {
        this.challenge_name = challenge_name;
    }
}
