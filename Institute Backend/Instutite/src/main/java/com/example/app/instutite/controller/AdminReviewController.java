package com.example.app.instutite.controller;

import com.example.app.instutite.entity.Review;
import com.example.app.instutite.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/reviews")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AdminReviewController {

    private final ReviewService reviewService;

    //  GET ALL REVIEWS (ADMIN)
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        try {
            return ResponseEntity.ok(reviewService.getAllReviews());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //  UPDATE REVIEW
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(
            @PathVariable Long id,
            @RequestBody Review review
    ) {
        try {
            Review updated = reviewService.updateReview(
                    id,
                    review.getRating(),
                    review.getComment()
            );
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // DELETE REVIEW
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        try {
            reviewService.deleteReview(id);
            return ResponseEntity.ok("Review deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body("Failed to delete review");
        }
    }
}
