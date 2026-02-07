package com.example.app.instutite.mapper;

import com.example.app.instutite.dto.CourseRequest;
import com.example.app.instutite.dto.CourseResponse;
import com.example.app.instutite.entity.Course;
import com.example.app.instutite.entity.Institute;

public class CourseMapper {

    public static Course toEntity(CourseRequest dto, Institute institute) {

        Course course = new Course();
        course.setCourseName(dto.getCourseName());
        course.setCourseCode(dto.getCourseCode());
        course.setDescription(dto.getDescription());
        course.setDuration(dto.getDuration());
        course.setFees(dto.getFees());
        course.setInstitute(institute);

        return course;
    }

    public static CourseResponse toDto(Course course) {

        CourseResponse dto = new CourseResponse();

        dto.setId(course.getId());
        dto.setCourseName(course.getCourseName());
        dto.setCourseCode(course.getCourseCode());
        dto.setDescription(course.getDescription());
        dto.setDuration(course.getDuration());
        dto.setFees(course.getFees());
        dto.setInstituteId(course.getInstitute().getId());

        return dto;
    }
}
