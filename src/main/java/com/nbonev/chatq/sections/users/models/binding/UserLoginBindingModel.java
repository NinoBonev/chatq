package com.nbonev.chatq.sections.users.models.binding;

import javax.validation.constraints.NotBlank;

/**
 * Created by Nino Bonev - 24.3.2019 г., 14:34
 */

public class UserLoginBindingModel {

    @NotBlank
    private String username;

    @NotBlank
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
