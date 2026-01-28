package com.example.app.instutite.controller;

import com.example.app.instutite.dto.AdminUserResponse;
import com.example.app.instutite.entity.User;
import com.example.app.instutite.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminUserController {

    private final UserRepository userRepository;

    //  GET ALL USERS (ADMIN)
    @GetMapping
    public List<AdminUserResponse> getAllUsers() {
        try {
            return userRepository.findAll()
                    .stream()
                    .map(user -> new AdminUserResponse(
                            user.getId(),
                            user.getEmail(),
                            user.getRole()
                    ))
                    .toList();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch users");
        }
    }

    //  DELETE USER
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
