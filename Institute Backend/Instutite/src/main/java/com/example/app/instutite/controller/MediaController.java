package com.example.app.instutite.controller;

import com.example.app.instutite.dto.MediaResponse;
import com.example.app.instutite.service.MediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institutes/{instituteId}/media")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MediaController {

    private final MediaService mediaService;

    // ADD
    @PostMapping
    public ResponseEntity<MediaResponse> uploadMediaByUrl(
            @PathVariable Long instituteId,
            @RequestParam("url") String url
    ) {
        return ResponseEntity.ok(
                mediaService.addMediaUrl(instituteId, url)
        );
    }

    // GET
    @GetMapping
    public ResponseEntity<List<MediaResponse>> getMedia(
            @PathVariable Long instituteId) {

        return ResponseEntity.ok(
                mediaService.getMediaByInstitute(instituteId)
        );
    }

    // UPDATE
    @PutMapping("/{mediaId}")
    public ResponseEntity<MediaResponse> updateMedia(
            @PathVariable Long mediaId,
            @RequestParam("url") String newUrl
    ) {
        return ResponseEntity.ok(
                mediaService.updateMedia(mediaId, newUrl)
        );
    }

    // DELETE
    @DeleteMapping("/{mediaId}")
    public ResponseEntity<String> deleteMedia(
            @PathVariable Long mediaId) {

        mediaService.deleteMedia(mediaId);
        return ResponseEntity.ok("Media deleted successfully");
    }
}
