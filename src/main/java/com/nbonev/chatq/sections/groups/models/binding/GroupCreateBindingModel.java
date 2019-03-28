package com.nbonev.chatq.sections.groups.models.binding;

import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.util.cloudinary.ImageUpload;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Nino Bonev - 24.3.2019 г., 15:39
 */
public class GroupCreateBindingModel {

    private String name;
    private String info;
    private String cover;

    public GroupCreateBindingModel() {
    }

    public GroupCreateBindingModel(String name, String info, String cover) {
        this.name = name;
        this.info = info;
        this.cover = cover;
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

    public void uploadAndSetCover(String cover) throws IOException {
        ImageUpload image = new ImageUpload();
        this.cover = image.uploadAndGetUrl(cover);
    }
}
