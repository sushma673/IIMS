package com.example.app.instutite.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class ReviewResponse {
        private Long id;
        private String username;
        private int rating;
        private String comment;
    }
    