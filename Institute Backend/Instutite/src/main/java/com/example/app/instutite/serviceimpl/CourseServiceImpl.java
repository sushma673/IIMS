package com.example.app.instutite.serviceimpl;



import com.example.app.instutite.dto.CourseRequest;
import com.example.app.instutite.dto.CourseResponse;
import com.example.app.instutite.entity.Course;
import com.example.app.instutite.entity.Institute;
import com.example.app.instutite.exception.CourseNotFoundException;
import com.example.app.instutite.exception.DuplicateCourseCodeException;
import com.example.app.instutite.mapper.CourseMapper;
import com.example.app.instutite.repository.CourseRepository;
import com.example.app.instutite.repository.InstituteRepository;
import com.example.app.instutite.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final InstituteRepository instituteRepository;

    @Override
    public CourseResponse createCourse(CourseRequest dto) {
        boolean exists = courseRepository.findByCourseCode(dto.courseCode)
                .filter(c -> c.getInstitute().getId().equals(dto.instituteId))
                .isPresent();

        if (exists) {
            throw new DuplicateCourseCodeException("Course code already exists for this institute");
        }

        Institute institute = instituteRepository.findById(dto.instituteId)
                .orElseThrow(() -> new RuntimeException("Institute not found"));

        Course course = CourseMapper.toEntity(dto, institute);
        Course saved = courseRepository.save(course);
        return CourseMapper.toDto(saved);
    }

    @Override
    public List<CourseResponse> createCourses(Long instituteId, List<CourseRequest> requests) {
        Institute institute = instituteRepository.findById(instituteId)
                .orElseThrow(() -> new RuntimeException("Institute not found"));

        List<Course> courses = requests.stream()
                .map(req -> {
                    boolean exists = courseRepository.findByCourseCode(req.courseCode)
                            .filter(c -> c.getInstitute().getId().equals(instituteId))
                            .isPresent();
                    if (exists) {
                        throw new DuplicateCourseCodeException("Course code already exists: " + req.courseCode);
                    }
                    return CourseMapper.toEntity(req, institute);
                })
                .toList();

        return courseRepository.saveAll(courses)
                .stream()
                .map(CourseMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CourseResponse> getCoursesByInstitute(Long instituteId) {
        return courseRepository.findByInstituteId(instituteId)
                .stream()
                .map(CourseMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course not found"));
        return CourseMapper.toDto(course);
    }

    @Override
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
