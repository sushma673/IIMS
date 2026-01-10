package com.example.app.instutite.mapper;


import com.example.app.instutite.dto.CourseRequest;
import com.example.app.instutite.dto.CourseResponse;
import com.example.app.instutite.entity.Course;
import com.example.app.instutite.entity.Institute;

public class CourseMapper {

        public static Course toEntity(CourseRequest dto, Institute institute) {
            Course course = new Course();
            course.setCourseName(dto.courseName);
            course.setCourseCode(dto.courseCode);
            course.setDescription(dto.description);
            course.setDuration(dto.duration);
            course.setFees(dto.fees);
            course.setInstitute(institute);
            return course;
        }

        public static CourseResponse toDto(Course course) {
            CourseResponse dto = new CourseResponse();
            dto.id = course.getId();
            dto.courseName = course.getCourseName();
            dto.courseCode = course.getCourseCode();
            dto.description = course.getDescription();
            dto.duration = course.getDuration();
            dto.fees = course.getFees();
            dto.instituteId = course.getInstitute().getId();
            return dto;
        }
    }

