package com.nbonev.chatq.sections.users.models.binding;

import com.nbonev.chatq.sections.users.utils.Constants;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * Created by Nino Bonev - 24.3.2019 г., 14:34
 */

public class UserLoginBindingModel {

    @NotBlank
    @Size(min = 4, max = 15, message = Constants.USER_USERNAME_VALIDATION)
    private String username;

    @NotBlank
    @Size(min = 4, max = 20, message = Constants.USER_PASSWORD_SIZE_VALIDATION)
    private String password;

    public UserLoginBindingModel() {
    }

    public UserLoginBindingModel(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
