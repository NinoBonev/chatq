package com.nbonev.chatq.sections.challenges.enums;

/**
 * Created by Nino Bonev - 30.3.2019 г., 14:56
 */
public enum ChallengeStatus {
    OPEN("OPEN"), CLOSED("CLOSED"), ARCHIVED("ARCHIVED");

    private String statusName;

    private ChallengeStatus(String statusName) {
        this.statusName = statusName;
    }

    public String getStatusName() {
        return statusName;
    }
}
