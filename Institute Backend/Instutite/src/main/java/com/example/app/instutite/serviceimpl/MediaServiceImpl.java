package com.example.app.instutite.serviceimpl;

import com.example.app.instutite.dto.MediaResponse;
import com.example.app.instutite.entity.Institute;
import com.example.app.instutite.entity.Media;
import com.example.app.instutite.repository.InstituteRepository;
import com.example.app.instutite.repository.MediaRepository;
import com.example.app.instutite.service.MediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class MediaServiceImpl implements MediaService {

        private final MediaRepository mediaRepository;
        private final InstituteRepository instituteRepository;

        @Override
        public MediaResponse addMediaUrl(Long instituteId, String url) {
            Institute institute = instituteRepository.findById(instituteId)
                    .orElseThrow(() -> new RuntimeException("Institute not found"));

            Media media = Media.builder()
                    .imageUrl(url)
                    .institute(institute)
                    .build();

            Media saved = mediaRepository.save(media);

            return MediaResponse.builder()
                    .id(saved.getId())
                    .imageUrl(saved.getImageUrl())
                    .build();
        }

        @Override
        public List<MediaResponse> getMediaByInstitute(Long instituteId) {
            Institute institute = instituteRepository.findById(instituteId)
                    .orElseThrow(() -> new RuntimeException("Institute not found"));

            return mediaRepository.findByInstitute(institute)
                    .stream()
                    .map(media -> MediaResponse.builder()
                            .id(media.getId())
                            .imageUrl(media.getImageUrl())
                            .build())
                    .collect(Collectors.toList());
        }
    }

