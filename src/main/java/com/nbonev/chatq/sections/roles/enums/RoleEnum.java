package com.nbonev.chatq.sections.roles.enums;

/**
 * Created by Nino Bonev - 23.3.2019 г., 11:23
 */

public enum RoleEnum {
    USER("ROLE_USER"), ADMIN("ROLE_ADMIN");

    private String roleName;

    private RoleEnum(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName;
    }
}
