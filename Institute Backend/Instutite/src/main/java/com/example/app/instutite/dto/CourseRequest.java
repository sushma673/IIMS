package com.example.app.instutite.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class CourseRequest {

        @NotBlank
        public String courseName;

        @NotBlank
        public String courseCode;

        public String description;
        public String duration;

        @Positive
        public Double fees;

        @NotNull
        public Long instituteId;
    }

