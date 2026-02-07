package com.example.app.instutite.controller;

import com.example.app.instutite.dto.ReviewRequest;
import com.example.app.instutite.dto.ReviewResponse;
import com.example.app.instutite.entity.Review;
import com.example.app.instutite.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // ADD REVIEW
    @PostMapping
    public ResponseEntity<ReviewResponse> addReview(
            @RequestParam String email,
            @RequestBody ReviewRequest request
    ) {

        Review saved = reviewService.addReview(
                email,
                request.getRating(),
                request.getComment()
        );

        return ResponseEntity.ok(
                new ReviewResponse(
                        saved.getId(),
                        saved.getEmail(),
                        saved.getRating(),
                        saved.getComment()
                )
        );
    }

    // GET REVIEWS BY EMAIL
    @GetMapping("/user")
    public ResponseEntity<List<Review>> getMyReviews(@RequestParam String email) {

        return ResponseEntity.ok(
                reviewService.getReviewsByEmail(email)
        );
    }
}
