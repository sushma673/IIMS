package com.example.app.instutite.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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

        private String description;
        private String duration;
        private Double fees;


        //  Course → Institute (MANY → ONE)
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "institute_id", nullable = false)
        @JsonIgnore
        private Institute institute;


    }


