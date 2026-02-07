package com.example.app.instutite.entity;



import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "media")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Media {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String imageUrl; // store the URL

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "institute_id", nullable = false)
        private Institute institute;
}