package com.nbonev.chatq.payload;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Nino Bonev - 12.4.2019 г., 9:33
 */
public class ApiError {
    private List<String> errors;

    public ApiError(BindingResult bindingResult) {
        this.errors = new ArrayList<>();
        this.setErrorsFromBindingResult(bindingResult);
    }

    public ApiError(ResourceNotFoundException ex){
        this.errors = new ArrayList<>();
        this.setErrorsFromResourceNotFoundException(ex);
    }

    public List<String> getErrors() {
        return errors;
    }

    private void setErrorsFromBindingResult(BindingResult bindingResult) {
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            errors.add(fieldError.getField() + ":" + fieldError.getDefaultMessage());
        }
    }

    private void setErrorsFromResourceNotFoundException(ResourceNotFoundException ex){
        errors.add(ex.getMessage());
    }

    public ResponseEntity<ApiResponse> getBadRequestResponseEntity(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse(false, this.errors));
    }

    public ResponseEntity<ApiResponse> getResourceNotFoundResponseEntity(){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse(false, this.errors));
    }

}
