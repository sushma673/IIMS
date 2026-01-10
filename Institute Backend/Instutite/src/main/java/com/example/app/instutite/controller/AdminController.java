package com.example.app.instutite.controller;

import com.example.app.instutite.entity.User;
import com.example.app.instutite.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins="http://localhost:5173")

public class AdminController {

        private final UserRepository userRepository;

        public AdminController(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        // Only users with ADMIN role can access this endpoint
        @PreAuthorize("hasRole('ADMIN')")
        @GetMapping("/profile")
        public User getProfile(Authentication authentication) {
            String email = authentication.getName();

            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Admin not found"));
        }
    }

