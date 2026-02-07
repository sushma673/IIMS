package com.example.app.instutite.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Review {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private String email;     //  logged-in user email

        @Column(nullable = false)
        private int rating;       // 1–5

        @Column(nullable = false, length = 1000)
        private String comment;
}
