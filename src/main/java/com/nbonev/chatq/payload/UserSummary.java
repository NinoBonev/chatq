package com.nbonev.chatq.payload;

/**
 * Created by Nino Bonev - 23.3.2019 г., 12:08
 */
public class UserSummary {
    private Long id;
    private String username;
    private String name;
    private String avatar;

    public UserSummary(Long id, String username, String name, String avatar) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.avatar = avatar;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
