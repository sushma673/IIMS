package com.example.app.instutite.controller;


import com.example.app.instutite.entity.Review;
import com.example.app.instutite.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/reviews")
public class ReviewController {
 private final ReviewService reviewService;

        public ReviewController(ReviewService reviewService) {
            this.reviewService = reviewService;
        }

        @PostMapping
        public ResponseEntity<Review> addReview(@RequestBody Review review) {
            return ResponseEntity.ok(reviewService.addReview(review));
        }

        @GetMapping
        public ResponseEntity<List<Review>> getAllReviews() {
            return ResponseEntity.ok(reviewService.getAllReviews());
        }

        @GetMapping("/user/{username}")
        public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable String username) {
            return ResponseEntity.ok(reviewService.getReviewsByUser(username));
        }
    }

