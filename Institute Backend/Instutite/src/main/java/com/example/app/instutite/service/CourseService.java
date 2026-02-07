package com.example.app.instutite.service;

import com.example.app.instutite.dto.CourseRequest;
import com.example.app.instutite.dto.CourseResponse;

import java.util.List;

public interface CourseService {

        CourseResponse createCourse(CourseRequest dto);

        List<CourseResponse> createCourses(Long instituteId, List<CourseRequest> requests);

        List<CourseResponse> getCoursesByInstitute(Long instituteId);

        CourseResponse getCourseById(Long id);

        // ✅ UPDATE
        CourseResponse updateCourse(Long courseId, CourseRequest request);

        void deleteCourse(Long id);
}
