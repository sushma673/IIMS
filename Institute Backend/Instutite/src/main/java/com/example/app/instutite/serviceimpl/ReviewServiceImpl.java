package com.example.app.instutite.service.impl;

import com.example.app.instutite.entity.Review;
import com.example.app.instutite.repository.ReviewRepository;
import com.example.app.instutite.service.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // ADD REVIEW
    @Override
    public Review addReview(String email, int rating, String comment) {
        Review review = new Review();
        review.setEmail(email);
        review.setRating(rating);
        review.setComment(comment);
        return reviewRepository.save(review);
    }

    // UPDATE REVIEW
    @Override
    public Review updateReview(Long id, int rating, String comment) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        review.setRating(rating);
        review.setComment(comment);
        return reviewRepository.save(review);
    }

    // DELETE REVIEW
    @Override
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new RuntimeException("Review not found");
        }
        reviewRepository.deleteById(id);
    }

    // GET ALL REVIEWS
    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // GET REVIEWS BY EMAIL
    @Override
    public List<Review> getReviewsByEmail(String email) {
        return reviewRepository.findByEmail(email);
    }
}
