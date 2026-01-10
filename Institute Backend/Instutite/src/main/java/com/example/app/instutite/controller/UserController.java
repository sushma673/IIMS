package com.example.app.instutite.controller;
import com.example.app.instutite.entity.User;
import com.example.app.instutite.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="http://localhost:5173")

public class UserController {

        private final UserRepository userRepository;

        public UserController(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        @GetMapping("/profile")
        public User getProfile(Authentication authentication) {

            String email = authentication.getName();

            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
    }


