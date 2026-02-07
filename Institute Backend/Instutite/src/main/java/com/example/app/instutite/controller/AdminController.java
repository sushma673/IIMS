package com.example.app.instutite.controller;

import com.example.app.instutite.entity.Admin;
import com.example.app.instutite.service.AdminService;
import com.example.app.instutite.Config.JwtUtil;   // ✅ IMPORT

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService service;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Admin admin) {
        return ResponseEntity.ok(service.saveAdmin(admin));
    }

    // LOGIN (NO TOKEN)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {

        Admin dbAdmin = service.login(
                admin.getEmail(),
                admin.getPassword()
        );

        if (dbAdmin == null) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid credentials");
        }

        // ✅ ONLY SUCCESS MESSAGE
        return ResponseEntity.ok("Login Success");
    }
}
