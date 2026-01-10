package com.example.app.instutite.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "branches")

public class Branch {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "branch_name", nullable = false)
        private String branchName;

        @Column(nullable = false)
        private String address;

        @Column(nullable = false)
        private String city;

        @Column(nullable = false)
        private String state;

        @Column(nullable = false)
        private String phone;

        @Column(name = "created_at", nullable = false, updatable = false)
        private LocalDateTime createdAt;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "institute_id", nullable = false)
        private Institute institute;

        @PrePersist
        protected void onCreate() {
            this.createdAt = LocalDateTime.now();
        }
    }

