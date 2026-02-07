package com.example.app.instutite.service;


import com.example.app.instutite.entity.Review;

import java.util.List;

public interface ReviewService {

    Review addReview(String email, int rating, String comment);

    Review updateReview(Long id, int rating, String comment);

    void deleteReview(Long id);

    List<Review> getAllReviews();

    List<Review> getReviewsByEmail(String email);
}
