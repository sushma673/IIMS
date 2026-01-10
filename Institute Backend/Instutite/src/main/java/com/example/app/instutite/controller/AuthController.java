package com.example.app.instutite.controller;

import com.example.app.instutite.dto.AuthResponse;
import com.example.app.instutite.dto.LoginRequest;
import com.example.app.instutite.dto.OtpRequest;
import com.example.app.instutite.dto.RegisterRequest;
import com.example.app.instutite.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ========================
    // REGISTER
    // ========================
    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request) {

        authService.register(request);
        return ResponseEntity.ok("Registration successful. OTP sent to email.");
    }

    // ========================
    // VERIFY OTP
    // ========================
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @Valid @RequestBody OtpRequest request) {

        authService.verifyOtp(request);
        return ResponseEntity.ok("Email verified successfully.");
    }

    // ========================
    // LOGIN
    // ========================
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        String token = authService.login(request);
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
