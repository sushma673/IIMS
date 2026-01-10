package com.example.app.instutite.controller;

import com.example.app.instutite.dto.CourseRequest;
import com.example.app.instutite.dto.CourseResponse;
import com.example.app.instutite.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/institutes/{instituteId}/courses")

public class CourseController {

        private final CourseService courseService;

        // ================= CREATE SINGLE COURSE =================
        @PostMapping
        public CourseResponse createCourse(
                @PathVariable Long instituteId,
                @RequestBody CourseRequest request) {
            request.instituteId = instituteId;
            return courseService.createCourse(request);
        }

        // ================= CREATE MULTIPLE COURSES =================
        @PostMapping("/bulk")
        public List<CourseResponse> createMultipleCourses(
                @PathVariable Long instituteId,
                @RequestBody List<CourseRequest> requests) {
            return courseService.createCourses(instituteId, requests); // ✅ call bulk method
        }

        // ================= GET COURSES =================
        @GetMapping
        public List<CourseResponse> getCoursesByInstitute(
                @PathVariable Long instituteId) {
            return courseService.getCoursesByInstitute(instituteId);
        }

        // ================= GET COURSE BY ID =================
        @GetMapping("/{courseId}")
        public CourseResponse getCourseById(
                @PathVariable Long instituteId,
                @PathVariable Long courseId) {
            return courseService.getCourseById(courseId);
        }

        // ================= DELETE COURSE =================
        @DeleteMapping("/{courseId}")
        public void deleteCourse(
                @PathVariable Long instituteId,
                @PathVariable Long courseId) {
            courseService.deleteCourse(courseId);
        }

    }

