package com.nbonev.chatq.sections.groups.models.binding;

import com.nbonev.chatq.sections.groups.utils.Constants;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.util.cloudinary.ImageUpload;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Nino Bonev - 24.3.2019 г., 15:39
 */
public class GroupCreateBindingModel {

    @NotNull
    @NotEmpty(message = Constants.NAME_VALIDATION_MESSAGE)
    @Size(min = 6, max = 300)
    private String name;

    @NotNull
    @NotEmpty(message = Constants.INFO_VALIDATION_MESSAGE)
    @Size(min = 10, max = 12000)
    private String info;

    @NotNull
    @NotEmpty(message = Constants.COVER_VALIDATION_MESSAGE)
    private String cover;

    private String status;

    private Double x;
    private Double y;
    private Double height;
    private Double width;

    public GroupCreateBindingModel() {
    }

    public GroupCreateBindingModel(String name, String info, String cover, Double x,
                                   Double y, Double height, Double width) {
        this.name = name;
        this.info = info;
        this.cover = cover;
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

    public void uploadAndSetCover() throws IOException {
        ImageUpload image = new ImageUpload();
        this.cover = image.uploadAndGetUrlAspect_16_10(this.cover);
    }

    public void uploadWithTransformationAndGetUrl() throws IOException {
        ImageUpload image = new ImageUpload();
        this.cover = image.uploadWithTransformationAndGetUrl("16:10", this.cover, this.x, this.y, this.height, this.width);
    }
}
