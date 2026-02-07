package com.example.app.instutite.service;

import com.example.app.instutite.dto.MediaResponse;
import java.util.List;

public interface MediaService {

    MediaResponse addMediaUrl(Long instituteId, String url);

    List<MediaResponse> getMediaByInstitute(Long instituteId);

    MediaResponse updateMedia(Long mediaId, String newUrl);

    void deleteMedia(Long mediaId);
}
