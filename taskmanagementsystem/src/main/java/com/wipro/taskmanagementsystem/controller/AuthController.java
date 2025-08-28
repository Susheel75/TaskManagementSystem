package com.wipro.taskmanagementsystem.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.taskmanagementsystem.entity.User;
import com.wipro.taskmanagementsystem.payload.ApiResponse;
import com.wipro.taskmanagementsystem.payload.LoginRequest;
import com.wipro.taskmanagementsystem.payload.SignupRequest;
import com.wipro.taskmanagementsystem.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@RequestBody SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(new ApiResponse("Email already exists", null));
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); 
        User saved = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(new ApiResponse("User registered successfully", saved));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(new ApiResponse("Invalid credentials", null));
        }
        return ResponseEntity.ok(new ApiResponse("Login successful", user));
    }
}
