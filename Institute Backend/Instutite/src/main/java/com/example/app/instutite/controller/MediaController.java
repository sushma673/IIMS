package com.example.app.instutite.controller;

import com.example.app.instutite.dto.MediaResponse;
import com.example.app.instutite.service.MediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/institutes/{instituteId}/media")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")

public class MediaController {
    private final MediaService mediaService;

        @PostMapping
        public ResponseEntity<MediaResponse> uploadMediaByUrl(
                @PathVariable Long instituteId,
                @RequestParam("url") String url
        ) {
            return ResponseEntity.ok(mediaService.addMediaUrl(instituteId, url));
        }

        @GetMapping
        public ResponseEntity<List<MediaResponse>> getMedia(@PathVariable Long instituteId) {
            return ResponseEntity.ok(mediaService.getMediaByInstitute(instituteId));
        }

    }

