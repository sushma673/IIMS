package com.example.app.instutite.mapper;

import com.example.app.instutite.dto.*;
import com.example.app.instutite.entity.*;

import java.util.List;

public class InstituteMapper {

        public static InstituteResponse toResponse(Institute institute) {

                if (institute == null) return null;

                InstituteResponse response = new InstituteResponse();

                response.setId(institute.getId());
                response.setName(institute.getName());
                response.setDescription(institute.getDescription());
                response.setCategory(institute.getCategory());
                response.setFees(institute.getFees());
                response.setFacilities(institute.getFacilities());
                response.setBenefits(institute.getBenefits());
                response.setAccreditation(institute.getAccreditation());

                response.setAddress(institute.getAddress());
                response.setCity(institute.getCity());
                response.setState(institute.getState());
                response.setPincode(institute.getPincode());

                response.setPhone1(institute.getPhone1());
                response.setPhone2(institute.getPhone2());
                response.setEmail(institute.getEmail());
                response.setWebsite(institute.getWebsite());

                response.setOpenTime(institute.getOpenTime());
                response.setCloseTime(institute.getCloseTime());

                /* ============ IMAGES ============ */
                if (institute.getImages() != null) {
                        List<String> images = institute.getImages()
                                .stream()
                                .map(InstituteImage::getImageUrl)
                                .toList();
                        response.setImages(images);
                }

                /* ============ BRANCHES ============ */
                if (institute.getBranches() != null) {
                        List<BranchResponse> branches = institute.getBranches()
                                .stream()
                                .map(b -> new BranchResponse(
                                        b.getBranchName(),
                                        b.getAddress(),
                                        b.getCity(),
                                        b.getState(),
                                        b.getPhone()
                                ))
                                .toList();
                        response.setBranches(branches);
                }

                /* ============ COURSES + SYLLABUS ============ */
                if (institute.getCourses() != null) {

                        List<CourseResponse> courses = institute.getCourses()
                                .stream()
                                .map(c -> {

                                        List<SyllabusResponse> syllabusList =
                                                c.getSyllabusList() == null
                                                        ? List.of()
                                                        : c.getSyllabusList()
                                                        .stream()
                                                        .map(s -> new SyllabusResponse(
                                                                s.getId(),
                                                                s.getTopicName(),
                                                                s.getDescription(),
                                                                s.getDuration()
                                                        ))
                                                        .toList();

                                        return new CourseResponse(
                                                c.getId(),
                                                c.getCourseName(),
                                                c.getCourseCode(),
                                                c.getDescription(),
                                                c.getDuration(),
                                                c.getFees(),
                                                syllabusList,
                                                institute.getId() // ✅ FIX (VERY IMPORTANT)
                                        );
                                })
                                .toList();

                        response.setCourses(courses);
                }

                return response;
        }
}
