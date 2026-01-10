package com.example.app.instutite.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
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

        private LocalTime openTime;
        private LocalTime closeTime;

        // Relations
        @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<InstituteImage> images;

        @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Branch> branches;

        @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Course> courses;

        @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Media> mediaList;
    }


