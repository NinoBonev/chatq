package com.nbonev.chatq.sections.groups.models.view;

import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.users.entities.User;

import java.time.Instant;
import java.util.Date;
import java.util.Set;

/**
 * Created by Nino Bonev - 25.3.2019 г., 9:28
 */
public class GroupViewModel {

    private long id;
    private String name;
    private String info;
    private String cover;
    private Set<Long> storiesById;
    private Set<String> followersByUsername;
    private String status;

    public GroupViewModel() {
    }

    public GroupViewModel(long id, String name, String info, String cover,
                          Set<Long> storiesById, Set<String> followersByUsername, String status) {
        this.id = id;
        this.name = name;
        this.info = info;
        this.cover = cover;
        this.storiesById = storiesById;
        this.followersByUsername = followersByUsername;
        this.status = status;
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

    public Set<Long> getStoriesById() {
        return storiesById;
    }

    public void setStoriesById(Set<Long> storiesById) {
        this.storiesById = storiesById;
    }

    public Set<String> getFollowersByUsername() {
        return followersByUsername;
    }

    public void setFollowersByUsername(Set<String> followersByUsername) {
        this.followersByUsername = followersByUsername;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
