package com.example.app.instutite.repository;

import com.example.app.instutite.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository  extends JpaRepository<Review, Long> {
        List<Review> findByUsername(String username);
    }



