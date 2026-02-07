package com.example.app.instutite.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "courses",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"course_code", "institute_id"})
        }
)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Course {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private String courseName;

        @Column(name = "course_code", nullable = false)
        private String courseCode;

        @Column(columnDefinition = "TEXT")
        private String description;

        @Column(columnDefinition = "TEXT")
        private String duration;
        private Double fees;


        //  Course → Institute (MANY → ONE)
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "institute_id", nullable = false)
        @JsonIgnore
        private Institute institute;

        @OneToMany(
                mappedBy = "course",
                cascade = CascadeType.ALL,
                orphanRemoval = true
        )
        private List<Syllabus> syllabusList = new ArrayList<>();


}