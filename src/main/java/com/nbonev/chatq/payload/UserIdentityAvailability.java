package com.nbonev.chatq.payload;

/**
 * Created by Nino Bonev - 23.3.2019 г., 12:11
 */
public class UserIdentityAvailability {
    private Boolean available;

    public UserIdentityAvailability(Boolean available) {
        this.available = available;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
