package com.nbonev.chatq.sections.stories.models.binding;

import com.nbonev.chatq.sections.challenges.entities.Challenge;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.stories.utils.Constants;
import com.nbonev.chatq.sections.storylines.entities.StoryLine;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.util.cloudinary.ImageUpload;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.IOException;
import java.util.Set;

/**
 * Created by Nino Bonev - 25.3.2019 г., 12:45
 */
public class StoryCreateBindingModel {

    @NotNull
    @NotEmpty(message = Constants.NAME_VALIDATION_MESSAGE)
    @Size(min = 6, max = 300)
    private String name;

    @NotNull
    @NotEmpty(message = Constants.INFO_VALIDATION_MESSAGE)
    @Size(min = 25, max = 12000)
    private String info;

    @NotNull
    @NotEmpty(message = Constants.COVER_VALIDATION_MESSAGE)
    private String cover;

    private User user;
    private Group group;
    private Challenge challenge;
    private Set<StoryLine> storylines;

    private Double x;
    private Double y;
    private Double height;
    private Double width;

    public StoryCreateBindingModel() {
    }

    public StoryCreateBindingModel(String name, String info, String cover, User user, Double x,
                                   Double y, Double height, Double width) {
        this.name = name;
        this.info = info;
        this.cover = cover;
        this.user = user;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Set<StoryLine> getStoryLines() {
        return storylines;
    }

    public void setStoryLines(Set<StoryLine> storylines) {
        this.storylines = storylines;
    }

    public Challenge getChallenge() {
        return challenge;
    }

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
    }

    public Set<StoryLine> getStorylines() {
        return storylines;
    }

    public void setStorylines(Set<StoryLine> storylines) {
        this.storylines = storylines;
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

    public void uploadAndSetCover() throws IOException {
        ImageUpload image = new ImageUpload();
        this.cover = image.uploadAndGetUrl("16:10", this.cover);
    }

    public void uploadWithTransformationAndGetUrl() throws IOException {
        ImageUpload image = new ImageUpload();
        this.cover = image.uploadWithTransformationAndGetUrl("16:10", this.cover, this.x, this.y, this.height, this.width);
    }

    @Override
    public String toString() {
        return "StoryCreateBindingModel{" +
                "name='" + name + '\'' +
                ", info='" + info + '\'' +
                ", cover='" + cover + '\'' +
                ", user=" + user +
                ", group=" + group +
                ", challenge=" + challenge +
                ", storylines=" + storylines +
                ", x=" + x +
                ", y=" + y +
                ", height=" + height +
                ", width=" + width +
                '}';
    }
}
