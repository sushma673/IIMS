package com.example.app.instutite.serviceimpl;

import com.example.app.instutite.entity.Course;
import com.example.app.instutite.entity.Syllabus;
import com.example.app.instutite.repository.CourseRepository;
import com.example.app.instutite.repository.SyllabusRepository;
import com.example.app.instutite.service.SyllabusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SyllabusServiceImpl implements SyllabusService {

    private final SyllabusRepository syllabusRepository;
    private final CourseRepository courseRepository;

    @Override
    public Syllabus addSyllabus(Long courseId, Syllabus syllabus) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        syllabus.setCourse(course);
        return syllabusRepository.save(syllabus);
    }

    @Override
    public List<Syllabus> getSyllabusByCourse(Long courseId) {
        return syllabusRepository.findByCourseId(courseId);
    }

    // UPDATE SYLLABUS
    @Override
    public Syllabus updateSyllabus(Long syllabusId, Syllabus syllabus) {

        Syllabus existing = syllabusRepository.findById(syllabusId)
                .orElseThrow(() -> new RuntimeException("Syllabus not found"));

        existing.setTopicName(syllabus.getTopicName());
        existing.setDescription(syllabus.getDescription());
        existing.setDuration(syllabus.getDuration());


        return syllabusRepository.save(existing);
    }

    @Override
    public void deleteSyllabus(Long syllabusId) {
        syllabusRepository.deleteById(syllabusId);
    }
}
