package com.example.app.instutite.serviceimpl;

import com.example.app.instutite.dto.DashboardCountResponse;
import com.example.app.instutite.repository.CourseRepository;
import com.example.app.instutite.repository.InstituteRepository;
import com.example.app.instutite.repository.MediaRepository;
import com.example.app.instutite.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor

public class DashboardServiceImpl  implements DashboardService {

        private final InstituteRepository instituteRepository;
        private final CourseRepository courseRepository;
        private final MediaRepository mediaRepository;

        @Override
        public DashboardCountResponse getCounts() {
            return new DashboardCountResponse(
                    instituteRepository.count(),
                    courseRepository.count(),
                    mediaRepository.count()
            );
        }
    }

