package com.example.app.instutite.entity;

import com.example.app.instutite.entity.Branch;
import com.example.app.instutite.entity.Course;
import com.example.app.instutite.entity.InstituteImage;
import com.example.app.instutite.entity.Media;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "institute")
public class Institute {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        @Column(columnDefinition = "TEXT")
        private String description;

        private String category;

        private Double fees;

        @Column(columnDefinition = "TEXT")
        private String facilities;

        @Column(columnDefinition = "TEXT")
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

        @JsonFormat(pattern = "HH:mm")
        private LocalTime openTime;

        @JsonFormat(pattern = "HH:mm")
        private LocalTime closeTime;

        //  Relations (INITIALIZED)
        @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<InstituteImage> images = new ArrayList<>();

        @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Branch> branches = new ArrayList<>();

        @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Course> courses = new ArrayList<>();

        @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Media> mediaList = new ArrayList<>();
}