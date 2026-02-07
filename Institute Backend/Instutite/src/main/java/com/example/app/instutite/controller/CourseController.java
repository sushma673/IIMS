package com.example.app.instutite.controller;

import com.example.app.instutite.dto.CourseRequest;
import com.example.app.instutite.dto.CourseResponse;
import com.example.app.instutite.entity.Syllabus;
import com.example.app.instutite.service.CourseService;
import com.example.app.instutite.service.SyllabusService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/institutes/{instituteId}/courses")
public class CourseController {

    private final CourseService courseService;
    private final SyllabusService syllabusService;

    // ================= COURSE APIs =================

    @PostMapping
    public CourseResponse createCourse(
            @PathVariable Long instituteId,
            @RequestBody CourseRequest request) {

        request.setInstituteId(instituteId);
        return courseService.createCourse(request);
    }

    @GetMapping
    public List<CourseResponse> getCoursesByInstitute(
            @PathVariable Long instituteId) {

        return courseService.getCoursesByInstitute(instituteId);
    }

    @GetMapping("/{courseId}")
    public CourseResponse getCourseById(
            @PathVariable Long instituteId,
            @PathVariable Long courseId) {

        return courseService.getCourseById(courseId);
    }

    @PutMapping("/{courseId}")
    public CourseResponse updateCourse(
            @PathVariable Long instituteId,
            @PathVariable Long courseId,
            @RequestBody CourseRequest request) {

        request.setInstituteId(instituteId);
        return courseService.updateCourse(courseId, request);
    }

    @DeleteMapping("/{courseId}")
    public void deleteCourse(
            @PathVariable Long instituteId,
            @PathVariable Long courseId) {

        courseService.deleteCourse(courseId);
    }

    // ================= SYLLABUS APIs =================

    @PostMapping("/{courseId}/syllabus")
    public Syllabus addSyllabus(
            @PathVariable Long instituteId,
            @PathVariable Long courseId,
            @RequestBody Syllabus syllabus) {

        return syllabusService.addSyllabus(courseId, syllabus);
    }

    @GetMapping("/{courseId}/syllabus")
    public List<Syllabus> getSyllabus(
            @PathVariable Long instituteId,
            @PathVariable Long courseId) {

        return syllabusService.getSyllabusByCourse(courseId);
    }

    @PutMapping("/syllabus/{syllabusId}")
    public Syllabus updateSyllabus(
            @PathVariable Long instituteId,
            @PathVariable Long syllabusId,
            @RequestBody Syllabus syllabus) {

        return syllabusService.updateSyllabus(syllabusId, syllabus);
    }

    @DeleteMapping("/syllabus/{syllabusId}")
    public String deleteSyllabus(
            @PathVariable Long instituteId,
            @PathVariable Long syllabusId) {

        syllabusService.deleteSyllabus(syllabusId);
        return "Syllabus deleted successfully";
    }
}
