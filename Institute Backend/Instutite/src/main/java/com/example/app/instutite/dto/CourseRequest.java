package com.example.app.instutite.dto;



import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

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
