package com.example.app.instutite.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReviewResponse {

    private Long id;
    private String email;
    private int rating;
    private String comment;
}
