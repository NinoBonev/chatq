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

    public ChallengeCreateBindingModel() {
    }

    public ChallengeCreateBindingModel(String name, String info, String cover, Instant deadlineDate) {
        this.name = name;
        this.info = info;
        this.cover = cover;
        this.deadlineDate = deadlineDate;
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

    public void uploadAndSetCover(String cover) throws IOException {
        ImageUpload image = new ImageUpload();
        this.cover = image.uploadAndGetUrl(cover);
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
