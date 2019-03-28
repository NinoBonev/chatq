package com.nbonev.chatq.payload;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonReader;


/**
 * Created by Nino Bonev - 26.3.2019 г., 10:06
 */


public class StoryCreatePayload {

    private Long challenge;
    private Long group;
    private String cover;
    private String crop;
    private String userByUsername;
    private String info;
    private String name;
    private String storyLine;

    public StoryCreatePayload() {
    }

    public StoryCreatePayload(Long challenge, Long group, String cover, String crop,
                              String userByUsername, String info, String name, String storyLine) {
        this.challenge = challenge;
        this.group = group;
        this.cover = cover;
        this.crop = crop;
        this.userByUsername = userByUsername;
        this.info = info;
        this.name = name;
        this.storyLine = storyLine;
    }

    public Long getChallenge() {
        return challenge;
    }

    public void setChallenge(Long challenge) {
        this.challenge = challenge;
    }

    public Long getGroup() {
        return group;
    }

    public void setGroup(Long group) {
        this.group = group;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getCrop() {
        return crop;
    }

    public void setCrop(String cropJson) {
        this.crop = cropJson;
    }

    public String getUserByUsername() {
        return userByUsername;
    }

    public void setUserByUsername(String userByUsername) {
        this.userByUsername = userByUsername;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStoryLine() {
        return storyLine;
    }

    public void setStoryLine(String storyLine) {
        this.storyLine = storyLine;
    }
}
