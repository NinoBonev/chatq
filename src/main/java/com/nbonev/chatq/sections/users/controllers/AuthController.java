package com.nbonev.chatq.sections.users.controllers;

import com.nbonev.chatq.payload.ApiError;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.payload.JwtAuthenticationResponse;
import com.nbonev.chatq.sections.users.models.binding.UserLoginBindingModel;
import com.nbonev.chatq.sections.users.models.binding.UserRegisterBindingModel;
import com.nbonev.chatq.sections.users.services.UserService;
import com.nbonev.chatq.sections.users.utils.Constants;
import com.nbonev.chatq.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.io.IOException;

/**
 * Created by Nino Bonev - 23.3.2019 г., 12:26
 */

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Autowired
    public AuthController(UserService userService,JwtTokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    @PreAuthorize("!isAuthenticated()")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserLoginBindingModel userLoginBindingModel,
                                              BindingResult bindingResult) {
        if (bindingResult.hasErrors()){
            ApiError error = new ApiError(bindingResult);
            return error.getBadRequestResponseEntity();
        }

        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLoginBindingModel.getUsername(),
                        userLoginBindingModel.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = this.tokenProvider.generateToken(authentication);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse(true, new JwtAuthenticationResponse(jwt)));
    }

    @PostMapping("/register")
    @PreAuthorize("!isAuthenticated()")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterBindingModel userRegisterBindingModel,
                                          BindingResult bindingResult) throws IOException {

        if (this.userService.existsByUsername(userRegisterBindingModel.getUsername())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, Constants.USERNAME_TAKEN));
        }

        if (this.userService.existsByEmail(userRegisterBindingModel.getEmail())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, Constants.EMAIL_TAKEN));
        }

        this.userService.saveUser(userRegisterBindingModel);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(true, Constants.USER_CREATED_SUCCESS));

    }
}
