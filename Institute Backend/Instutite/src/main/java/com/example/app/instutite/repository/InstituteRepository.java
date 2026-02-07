package com.example.app.instutite.repository;

import com.example.app.instutite.entity.Institute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstituteRepository  extends JpaRepository<Institute, Long> {
    List<Institute> findByCategoryIgnoreCase(String category);
    }
