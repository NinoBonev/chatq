package com.nbonev.chatq.payload;

import javax.validation.constraints.NotBlank;

/**
 * Created by Nino Bonev - 23.3.2019 г., 12:31
 */
public class LoginRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

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
