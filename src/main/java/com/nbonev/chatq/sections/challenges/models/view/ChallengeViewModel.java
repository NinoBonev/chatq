package com.nbonev.chatq.sections.challenges.models.view;

import java.time.Instant;
import java.util.Set;

/**
 * Created by Nino Bonev - 26.3.2019 г., 12:52
 */
public class ChallengeViewModel {

    private long id;
    private String name;
    private String info;
    private String cover;
    private Instant deadlineDate;
    private Instant createdAt;
    private Set<Long> storiesById;

    public ChallengeViewModel() {
    }

    public ChallengeViewModel(long id, String name, String info, String cover,
                              Instant deadlineDate, Instant createdAt, Set<Long> storiesById) {
        this.id = id;
        this.name = name;
        this.info = info;
        this.cover = cover;
        this.deadlineDate = deadlineDate;
        this.storiesById = storiesById;
        this.createdAt = createdAt;
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

    public Set<Long> getStoriesById() {
        return storiesById;
    }

    public void setStoriesById(Set<Long> storiesById) {
        this.storiesById = storiesById;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
