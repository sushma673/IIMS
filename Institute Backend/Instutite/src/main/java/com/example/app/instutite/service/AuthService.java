package com.example.app.instutite.service;

import com.example.app.instutite.Config.JwtUtil;
import com.example.app.instutite.dto.LoginRequest;
import com.example.app.instutite.dto.OtpRequest;
import com.example.app.instutite.dto.RegisterRequest;
import com.example.app.instutite.entity.Role;
import com.example.app.instutite.entity.User;
import com.example.app.instutite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    // ========================
    // REGISTER
    // ========================
    public void register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user.setEmailVerified(false);

        String otp = generateOtp();
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));

        userRepository.save(user);
        emailService.sendOtpMail(user.getEmail(), otp);
    }

    // ========================
    // VERIFY OTP
    // ========================
    public void verifyOtp(OtpRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getOtp() == null || user.getOtpExpiry() == null) {
            throw new RuntimeException("OTP not generated");
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        if (!user.getOtp().equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        user.setEmailVerified(true);
        user.setOtp(null);
        user.setOtpExpiry(null);

        userRepository.save(user);
    }

    // ========================
    // LOGIN (JWT)
    // ========================
    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isEmailVerified()) {
            throw new RuntimeException("Email not verified");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        return jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );
    }

    // ========================
    // OTP GENERATOR
    // ========================
    private String generateOtp() {
        return String.valueOf(100000 + new Random().nextInt(900000));
    }
}
