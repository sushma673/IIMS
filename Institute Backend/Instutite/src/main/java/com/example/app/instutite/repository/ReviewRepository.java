package com.example.app.instutite.repository;

import com.example.app.instutite.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByEmail(String email);
}
