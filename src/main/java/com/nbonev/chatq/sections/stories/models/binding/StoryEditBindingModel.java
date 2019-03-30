package com.nbonev.chatq.sections.stories.models.binding;

import com.nbonev.chatq.sections.stories.utils.Constants;
import com.nbonev.chatq.util.cloudinary.ImageUpload;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.IOException;

/**
 * Created by Nino Bonev - 28.3.2019 г., 16:09
 */
public class StoryEditBindingModel {

    private Long id;

//    @NotNull
//    @NotEmpty(message = Constants.NAME_VALIDATION_MESSAGE)
//    @Size(min = 6, max = 300)
    private String name;

//    @NotNull
//    @NotEmpty(message = Constants.INFO_VALIDATION_MESSAGE)
//    @Size(min = 25, max = 12000)
    private String info;

//    @NotNull
//    @NotEmpty(message = Constants.COVER_VALIDATION_MESSAGE)
    private String cover;

    public StoryEditBindingModel() {
    }

    public StoryEditBindingModel(String name, String info, String cover) {
        this.name = name;
        this.info = info;
        this.cover = cover;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public void uploadAndSetCover(String cover) throws IOException {
        ImageUpload image = new ImageUpload();
        this.cover = image.uploadAndGetUrl(cover);
    }
}
