package com.nbonev.chatq.payload;

/**
 * Created by Nino Bonev - 23.3.2019 г., 12:30
 */
public class ApiResponse {

    private Boolean success;
    private Object body;

    public ApiResponse(Boolean success, Object body) {
        this.success = success;
        this.body = body;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public Object getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
