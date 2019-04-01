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
    private Double x;
    private Double y;
    private Double height;
    private Double width;

    public StoryCreatePayload() {
    }

    public StoryCreatePayload(Long challenge, Long group, String cover, String crop,
                              String userByUsername, String info, String name, String storyLine,
                              Double x, Double y, Double height, Double width) {
        this.challenge = challenge;
        this.group = group;
        this.cover = cover;
        this.crop = crop;
        this.userByUsername = userByUsername;
        this.info = info;
        this.name = name;
        this.storyLine = storyLine;
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
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

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }
}
