package com.example.app.instutite.service;


import com.example.app.instutite.dto.BranchRequest;
import com.example.app.instutite.dto.InstituteRequest;
import com.example.app.instutite.dto.InstituteResponse;

import java.util.List;

public interface InstituteService {

    // Create institute
    InstituteResponse createInstitute(InstituteRequest request);

    // Get all institutes
    List<InstituteResponse> getAllInstitutes();

    // Get institute by ID
    InstituteResponse getInstituteById(Long id);

    //  Update institute
    InstituteResponse updateInstitute(Long id, InstituteRequest request);

    //  Delete institute
    void deleteInstitute(Long id);

    InstituteResponse addBranches(Long id, List<BranchRequest> branches);

    List<InstituteResponse> getInstitutesByCategory(String category);

}


