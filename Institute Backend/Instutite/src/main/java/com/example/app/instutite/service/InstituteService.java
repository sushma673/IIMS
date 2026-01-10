package com.example.app.instutite.service;

import com.example.app.instutite.dto.InstituteRequest;
import com.example.app.instutite.dto.InstituteResponse;

import java.util.List;

public interface InstituteService {

        InstituteResponse createInstitute(InstituteRequest request);

        List<InstituteResponse> getAllInstitutes();

        InstituteResponse getInstituteById(Long id);


    }



