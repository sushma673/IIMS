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
@Table(name = "institute_images")

public class InstituteImage {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String imageUrl;

        private LocalDateTime createdAt = LocalDateTime.now();

        @ManyToOne
        @JoinColumn(name = "institute_id")
        private Institute institute;
    }

