package com.example.app.instutite.dto;

import lombok.*;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class InstituteResponse {

        private Long id;
        private String name;
        private String description;
        private String category;
        private Double fees;
        private String facilities;
        private String benefits;
        private String accreditation;

        private String address;
        private String city;
        private String state;
        private String pincode;

        private String phone1;
        private String phone2;
        private String email;
        private String website;

        private LocalTime openTime;
        private LocalTime closeTime;

        private List<String> images;
        private List<BranchResponse> branches;
        private List<CourseResponse> courses;   // ✅ VERY IMPORTANT
}
