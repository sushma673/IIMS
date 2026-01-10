package com.example.app.instutite.serviceimpl;

import com.example.app.instutite.dto.BranchResponse;
import com.example.app.instutite.dto.InstituteRequest;
import com.example.app.instutite.dto.InstituteResponse;
import com.example.app.instutite.entity.Branch;
import com.example.app.instutite.entity.Institute;
import com.example.app.instutite.entity.InstituteImage;
import com.example.app.instutite.repository.InstituteRepository;
import com.example.app.instutite.service.InstituteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InstituteServiceImpl implements InstituteService {

    private final InstituteRepository instituteRepository;

    @Override
    public InstituteResponse createInstitute(InstituteRequest request) {

        Institute institute = new Institute();

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

        if (request.getImageUrls() != null) {
            List<InstituteImage> images = request.getImageUrls().stream()
                    .map(url -> {
                        InstituteImage img = new InstituteImage();
                        img.setImageUrl(url);
                        img.setCreatedAt(LocalDateTime.now());
                        img.setInstitute(institute);
                        return img;
                    }).toList();
            institute.setImages(images);
        }

        if (request.getBranches() != null) {
            List<Branch> branches = request.getBranches().stream()
                    .map(b -> {
                        Branch branch = new Branch();
                        branch.setBranchName(b.getBranchName());
                        branch.setAddress(b.getAddress());
                        branch.setCity(b.getCity());
                        branch.setState(b.getState());
                        branch.setPhone(b.getPhone());
                        branch.setCreatedAt(LocalDateTime.now());
                        branch.setInstitute(institute);
                        return branch;
                    }).toList();
            institute.setBranches(branches);
        }

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
                .orElse(null);
    }

    private InstituteResponse convertToResponse(Institute institute) {
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
                institute.getImages() != null
                        ? institute.getImages().stream()
                        .map(InstituteImage::getImageUrl)
                        .toList()
                        : List.of(),
                institute.getBranches() != null
                        ? institute.getBranches().stream()
                        .map(b -> new BranchResponse(
                                b.getBranchName(),
                                b.getAddress(),
                                b.getCity(),
                                b.getState(),
                                b.getPhone()
                        )).toList()
                        : List.of()
        );
    }
}
