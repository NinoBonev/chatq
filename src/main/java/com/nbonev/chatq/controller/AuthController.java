package com.nbonev.chatq.controller;

import com.cloudinary.utils.ObjectUtils;
import com.nbonev.chatq.entity.Role;
import com.nbonev.chatq.entity.RoleName;
import com.nbonev.chatq.entity.User;
import com.nbonev.chatq.exception.AppException;
import com.nbonev.chatq.payload.ApiResponse;
import com.nbonev.chatq.payload.JwtAuthenticationResponse;
import com.nbonev.chatq.payload.LoginRequest;
import com.nbonev.chatq.payload.SignUpRequest;
import com.nbonev.chatq.repository.RoleRepository;
import com.nbonev.chatq.repository.UserRepository;
import com.nbonev.chatq.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.cloudinary.*;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.Collections;
import java.util.Map;

/**
 * Created by Nino Bonev - 23.3.2019 г., 12:26
 */

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) throws IOException {
        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dar4inn2i",
                "api_key", "287582975438516",
                "api_secret", "wQ6E2D6mTcDg4D8T8GyC2w8rzlo"));

        Map uploadResult = cloudinary.uploader().upload(signUpRequest.getAvatar(), ObjectUtils.emptyMap());

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword(), (String) uploadResult.get("url"));

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "You have successfully created your profile"));
    }
}
