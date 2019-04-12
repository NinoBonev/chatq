package com.nbonev.chatq.sections.users.models.binding;

import com.nbonev.chatq.sections.users.utils.Constants;
import com.nbonev.chatq.util.cloudinary.ImageUpload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.IOException;

/**
 * Created by Nino Bonev - 24.3.2019 г., 11:49
 */


public class UserRegisterBindingModel {

    @NotBlank
    @Size(min = 4, max = 40, message = Constants.USER_NAME_VALIDATION)
    private String name;

    @NotBlank
    @Size(min = 4, max = 15, message = Constants.USER_USERNAME_VALIDATION)
    private String username;

    @NotBlank
    @Size(max = 40, message = Constants.USER_EMAIL_SIZE_VALIDATION)
    @Email(message = Constants.USER_EMAIL_FORMAT_VALIDATION)
    private String email;

    @NotBlank
    @Size(min = 4, max = 20, message = Constants.USER_PASSWORD_SIZE_VALIDATION)
    private String password;

    @NotBlank(message = Constants.USER_AVATAR_VALIDATION)
    private String avatar;

    public UserRegisterBindingModel() {
    }

    public UserRegisterBindingModel(String name, String username, String email, String password, String avatar) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void uploadAndSetAvatar() throws IOException {
        ImageUpload image = new ImageUpload();
        this.avatar = image.uploadAndSetStoryLine(this.avatar);
    }
}
