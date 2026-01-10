package com.example.app.instutite.service;

import com.example.app.instutite.dto.CourseRequest;
import com.example.app.instutite.dto.CourseResponse;

import java.util.List;

public interface CourseService {

        CourseResponse createCourse(CourseRequest dto);
        List<CourseResponse> createCourses(Long instituteId, List<CourseRequest> requests); // ✅ new bulk method
        List<CourseResponse> getCoursesByInstitute(Long instituteId);
        CourseResponse getCourseById(Long id);
        void deleteCourse(Long id);
    }

