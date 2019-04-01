package com.nbonev.chatq.sections.challenges.models.binding;

import com.nbonev.chatq.util.cloudinary.ImageUpload;

import java.io.IOException;
import java.time.Instant;

/**
 * Created by Nino Bonev - 26.3.2019 г., 12:51
 */


public class ChallengeCreateBindingModel {

    private String name;
    private String info;
    private String cover;
    private Instant deadlineDate;
    private String status;
    private Double x;
    private Double y;
    private Double height;
    private Double width;

    public ChallengeCreateBindingModel() {
    }

    public ChallengeCreateBindingModel(String name, String info, String cover, Instant deadlineDate, Double x,
                                       Double y, Double height, Double width) {
        this.name = name;
        this.info = info;
        this.cover = cover;
        this.deadlineDate = deadlineDate;
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

    public Instant getDeadlineDate() {
        return deadlineDate;
    }

    public void setDeadlineDate(Instant deadlineDate) {
        this.deadlineDate = deadlineDate;
    }

    public void uploadAndSetCover() throws IOException {
        ImageUpload image = new ImageUpload();
        this.cover = image.uploadAndGetUrlAspect_1(this.cover);
    }

    public void uploadWithTransformationAndGetUrl() throws IOException {
        ImageUpload image = new ImageUpload();
        this.cover = image.uploadWithTransformationAndGetUrl("1", this.cover, this.x, this.y, this.height, this.width);
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
