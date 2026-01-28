package com.example.app.instutite.service;

import com.example.app.instutite.entity.Syllabus;
import java.util.List;

public interface SyllabusService {

    Syllabus addSyllabus(Long courseId, Syllabus syllabus);

    List<Syllabus> getSyllabusByCourse(Long courseId);

    Syllabus updateSyllabus(Long syllabusId, Syllabus syllabus);

    void deleteSyllabus(Long syllabusId);
}
