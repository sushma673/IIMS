package com.example.app.instutite.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BranchRequest {

        private Long id;   // ⭐ IMPORTANT

        private String branchName;
        private String address;
        private String city;
        private String state;
        private String phone;
}
