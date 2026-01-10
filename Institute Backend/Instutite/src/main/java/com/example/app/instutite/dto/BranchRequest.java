package com.example.app.instutite.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class BranchRequest {

        private String branchName;
        private String address;
        private String city;
        private String state;
        private String phone;
    }

