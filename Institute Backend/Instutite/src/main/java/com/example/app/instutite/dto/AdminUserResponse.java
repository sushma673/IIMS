package com.example.app.instutite.dto;


import com.example.app.instutite.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminUserResponse {
    private Long id;
    private String email;
    private Role role;
}
