package com.example.app.instutite.controller;

import com.example.app.instutite.dto.BranchRequest;
import com.example.app.instutite.dto.InstituteRequest;
import com.example.app.instutite.dto.InstituteResponse;
import com.example.app.instutite.service.InstituteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institutes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class InstituteController {

    private final InstituteService instituteService;

    // ================= CREATE =================
    @PostMapping
    public ResponseEntity<InstituteResponse> create(
            @RequestBody InstituteRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(instituteService.createInstitute(request));
    }

    // ================= GET ALL =================
    @GetMapping
    public ResponseEntity<List<InstituteResponse>> getAll() {
        return ResponseEntity.ok(instituteService.getAllInstitutes());
    }

    // ================= GET BY ID =================
    @GetMapping("/{id}")
    public ResponseEntity<InstituteResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(instituteService.getInstituteById(id));
    }

    // ================= UPDATE =================
    @PutMapping("/{id}")
    public ResponseEntity<InstituteResponse> updateInstitute(
            @PathVariable Long id,
            @RequestBody InstituteRequest request) {

        return ResponseEntity.ok(
                instituteService.updateInstitute(id, request)
        );
    }

    // ================= DELETE =================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {

        instituteService.deleteInstitute(id);
        return ResponseEntity.ok("Institute deleted successfully");
    }

    // ================= ADD BRANCHES =================
    @PutMapping("/{id}/branches")
    public ResponseEntity<InstituteResponse> addBranches(
            @PathVariable Long id,
            @RequestBody List<BranchRequest> branches) {

        return ResponseEntity.ok(
                instituteService.addBranches(id, branches)
        );
    }

    // ================= GET BY CATEGORY  FIXED =================
    @GetMapping("/category/{category}")
    public ResponseEntity<List<InstituteResponse>> getByCategory(
            @PathVariable String category) {

        return ResponseEntity.ok(
                instituteService.getInstitutesByCategory(category)
        );
    }


}
