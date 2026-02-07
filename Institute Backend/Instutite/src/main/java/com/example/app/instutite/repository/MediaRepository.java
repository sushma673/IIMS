package com.example.app.instutite.repository;


import com.example.app.instutite.entity.Institute;
import com.example.app.instutite.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Long> {

    List<Media> findByInstitute(Institute institute);
}

