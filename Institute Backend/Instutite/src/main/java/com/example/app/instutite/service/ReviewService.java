package com.example.app.instutite.service;


import com.example.app.instutite.entity.Review;
import com.example.app.instutite.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

        public ReviewService(ReviewRepository reviewRepository) {
            this.reviewRepository = reviewRepository;
        }

        public Review addReview(Review review) {
            return reviewRepository.save(review);
        }

        public List<Review> getAllReviews() {
            return reviewRepository.findAll();
        }

        public List<Review> getReviewsByUser(String username) {
            return reviewRepository.findByUsername(username);
        }
    }

