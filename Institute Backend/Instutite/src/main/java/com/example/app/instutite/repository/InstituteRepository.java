package com.example.app.instutite.repository;

import com.example.app.instutite.entity.Institute;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstituteRepository  extends JpaRepository<Institute, Long> {
    }
