package com.nbonev.chatq.sections.groups.enums;

/**
 * Created by Nino Bonev - 29.3.2019 г., 15:55
 */
public enum GroupStatus {
    OPEN("OPEN"), CLOSED("CLOSED"), ARCHIVED("ARCHIVED");

    private String statusName;

    private GroupStatus(String statusName) {
        this.statusName = statusName;
    }

    public String getStatusName() {
        return statusName;
    }
}
