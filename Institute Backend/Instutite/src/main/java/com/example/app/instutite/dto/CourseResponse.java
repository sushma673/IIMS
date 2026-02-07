package com.example.app.instutite.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {

        private Long id;
        private String courseName;
        private String courseCode;
        private String description;
        private String duration;
        private Double fees;

        private List<SyllabusResponse> syllabus; //  syllabus list
        private Long instituteId;               //  REQUIRED
}
