package com.nbonev.chatq.sections.storylines.models.binding;

import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.storylines.utils.Constants;
import com.nbonev.chatq.util.cloudinary.ImageUpload;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.IOException;

/**
 * Created by Nino Bonev - 25.3.2019 г., 15:36
 */
public class StoryLineCreateBindingModel {

    @NotNull
    @NotEmpty(message = Constants.INFO_VALIDATION_MESSAGE)
    @Size(min = 21, max = 12000)
    private String info;

    @NotNull
    @NotEmpty(message = Constants.COVER_VALIDATION_MESSAGE)
    private String cover;

    private String name;
    private Story story;

    public StoryLineCreateBindingModel() {
    }

    public StoryLineCreateBindingModel(String info, String cover) {
        this.info = info;
        this.cover = cover;
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

    public Story getStory() {
        return story;
    }

    public void setStory(Story story) {
        this.story = story;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void uploadAndSetCover(String cover) throws IOException {
        ImageUpload image = new ImageUpload();
        this.cover = image.uploadAndGetUrl(cover);
    }
}
