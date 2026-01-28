package com.example.app.instutite.repository;

import com.example.app.instutite.entity.Syllabus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SyllabusRepository extends JpaRepository<Syllabus, Long> {

    List<Syllabus> findByCourseId(Long courseId);
}
