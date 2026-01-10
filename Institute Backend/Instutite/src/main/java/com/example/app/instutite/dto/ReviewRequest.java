package com.example.app.instutite.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ReviewRequest {
        private String username;
        private int rating;
        private String comment;
    }

