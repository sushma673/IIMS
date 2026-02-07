package com.example.app.instutite.serviceimpl;

import com.example.app.instutite.dto.*;
import com.example.app.instutite.entity.*;
import com.example.app.instutite.repository.InstituteRepository;
import com.example.app.instutite.service.InstituteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstituteServiceImpl implements InstituteService {

    private final InstituteRepository instituteRepository;

    @Override
    public InstituteResponse createInstitute(InstituteRequest request) {
        Institute institute = new Institute();
        mapRequestToEntity(request, institute);
        return convertToResponse(instituteRepository.save(institute));
    }

    @Override
    public List<InstituteResponse> getAllInstitutes() {
        return instituteRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public InstituteResponse getInstituteById(Long id) {
        return instituteRepository.findById(id)
                .map(this::convertToResponse)
                .orElseThrow(() -> new RuntimeException("Institute not found"));
    }

    @Override
    public InstituteResponse updateInstitute(Long id, InstituteRequest request) {
        Institute institute = instituteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institute not found"));
        mapRequestToEntity(request, institute);
        return convertToResponse(instituteRepository.save(institute));
    }

    @Override
    public void deleteInstitute(Long id) {
        instituteRepository.deleteById(id);
    }

    /* ================= REQUEST → ENTITY ================= */

    private void mapRequestToEntity(InstituteRequest request, Institute institute) {

        institute.setName(request.getName());
        institute.setDescription(request.getDescription());
        institute.setCategory(request.getCategory());
        institute.setFees(request.getFees());
        institute.setFacilities(request.getFacilities());
        institute.setBenefits(request.getBenefits());
        institute.setAccreditation(request.getAccreditation());
        institute.setAddress(request.getAddress());
        institute.setCity(request.getCity());
        institute.setState(request.getState());
        institute.setPincode(request.getPincode());
        institute.setPhone1(request.getPhone1());
        institute.setPhone2(request.getPhone2());
        institute.setEmail(request.getEmail());
        institute.setWebsite(request.getWebsite());
        institute.setOpenTime(request.getOpenTime());
        institute.setCloseTime(request.getCloseTime());

        // IMAGES
        if (request.getImageUrls() != null) {
            institute.getImages().clear();
            for (String url : request.getImageUrls()) {
                InstituteImage img = new InstituteImage();
                img.setImageUrl(url);
                img.setInstitute(institute);
                institute.getImages().add(img);
            }
        }

        // BRANCHES
        if (request.getBranches() != null) {
            institute.getBranches().clear();
            for (BranchRequest b : request.getBranches()) {
                Branch branch = new Branch();
                branch.setBranchName(b.getBranchName());
                branch.setAddress(b.getAddress());
                branch.setCity(b.getCity());
                branch.setState(b.getState());
                branch.setPhone(b.getPhone());
                branch.setInstitute(institute);
                institute.getBranches().add(branch);
            }
        }
    }

    /* ================= ENTITY → RESPONSE ================= */

    private InstituteResponse convertToResponse(Institute institute) {

        List<String> images = institute.getImages() == null
                ? List.of()
                : institute.getImages().stream()
                .map(InstituteImage::getImageUrl)
                .toList();

        List<BranchResponse> branches = institute.getBranches() == null
                ? List.of()
                : institute.getBranches().stream()
                .map(b -> new BranchResponse(
                        b.getBranchName(),
                        b.getAddress(),
                        b.getCity(),
                        b.getState(),
                        b.getPhone()
                )).toList();

        List<CourseResponse> courses = institute.getCourses() == null
                ? List.of()
                : institute.getCourses().stream()
                .map(c -> {

                    List<SyllabusResponse> syllabusList =
                            c.getSyllabusList() == null
                                    ? List.of()
                                    : c.getSyllabusList().stream()
                                    .map(s -> new SyllabusResponse(
                                            s.getId(),
                                            s.getTopicName(),
                                            s.getDescription(),
                                            s.getDuration()
                                    )).toList();

                    return new CourseResponse(
                            c.getId(),
                            c.getCourseName(),
                            c.getCourseCode(),
                            c.getDescription(),
                            c.getDuration(),
                            c.getFees(),
                            syllabusList,
                            institute.getId()
                    );
                }).toList();

        return new InstituteResponse(
                institute.getId(),
                institute.getName(),
                institute.getDescription(),
                institute.getCategory(),
                institute.getFees(),
                institute.getFacilities(),
                institute.getBenefits(),
                institute.getAccreditation(),
                institute.getAddress(),
                institute.getCity(),
                institute.getState(),
                institute.getPincode(),
                institute.getPhone1(),
                institute.getPhone2(),
                institute.getEmail(),
                institute.getWebsite(),
                institute.getOpenTime(),
                institute.getCloseTime(),
                images,
                branches,
                courses
        );
    }

    // ================= GET BY CATEGORY ✅ FIXED =================
    @Override
    public List<InstituteResponse> getInstitutesByCategory(String category) {
        return instituteRepository.findByCategoryIgnoreCase(category)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public InstituteResponse addBranches(Long id, List<BranchRequest> branches) {

        Institute institute = instituteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institute not found"));

        for (BranchRequest b : branches) {
            Branch branch = new Branch();
            branch.setBranchName(b.getBranchName());
            branch.setAddress(b.getAddress());
            branch.setCity(b.getCity());
            branch.setState(b.getState());
            branch.setPhone(b.getPhone());
            branch.setInstitute(institute);
            institute.getBranches().add(branch);
        }

        return convertToResponse(instituteRepository.save(institute));
    }
}
