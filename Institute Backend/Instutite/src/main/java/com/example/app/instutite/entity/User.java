package com.example.app.instutite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // OTP & verification
    @Column(length = 6)
    private String otp;

    private LocalDateTime otpExpiry;

    private boolean emailVerified = false;

    // Constructors
    public User() {
    }

    public User(String email, String password, Role role) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.emailVerified = false;
    }

    @Column(nullable = false)
    private boolean enabled = true;  // maps to isEnabled()

    @Column(nullable = false)
    private boolean accountLocked = false;  // maps to isAccountLocked()



}

