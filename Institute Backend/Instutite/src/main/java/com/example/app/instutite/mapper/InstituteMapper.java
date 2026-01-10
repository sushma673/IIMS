package com.example.app.instutite.mapper;


import com.example.app.instutite.dto.InstituteResponse;
import com.example.app.instutite.entity.Institute;

public class InstituteMapper {
    public static InstituteResponse toResponse(Institute institute) {
            if (institute == null) return null;

            InstituteResponse response = new InstituteResponse();
            response.setId(institute.getId());
            response.setName(institute.getName());
            response.setDescription(institute.getDescription());
            response.setCategory(institute.getCategory());
            response.setAccreditation(institute.getAccreditation());
            response.setFees(institute.getFees());
            response.setFacilities(institute.getFacilities());
            response.setBenefits(institute.getBenefits());

            response.setAddress(institute.getAddress());
            response.setCity(institute.getCity());
            response.setState(institute.getState());
            response.setPincode(institute.getPincode());

            response.setPhone1(institute.getPhone1());
            response.setPhone2(institute.getPhone2());
            response.setEmail(institute.getEmail());
            response.setWebsite(institute.getWebsite());  // 🔥 KEY

            response.setOpenTime(institute.getOpenTime());
            response.setCloseTime(institute.getCloseTime());

            return response;
        }
    }
