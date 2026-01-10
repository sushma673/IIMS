package com.example.app.instutite.controller;

import com.example.app.instutite.dto.InstituteRequest;
import com.example.app.instutite.dto.InstituteResponse;
import com.example.app.instutite.service.InstituteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/institutes")
@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:5173")


public class InstituteController {
        private final InstituteService instituteService;

        @PostMapping
        public InstituteResponse create(@RequestBody InstituteRequest request) {
            return instituteService.createInstitute(request);
        }

        @GetMapping
        public List<InstituteResponse> getAll() {
            return instituteService.getAllInstitutes();
        }

        @GetMapping("/{id}")
        public InstituteResponse getById(@PathVariable Long id) {
            return instituteService.getInstituteById(id);
        }
    }


