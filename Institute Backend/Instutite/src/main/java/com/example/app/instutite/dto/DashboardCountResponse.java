package com.example.app.instutite.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardCountResponse {
    private long institutes;
    private long courses;
    private long users;
    private long reviews;
}
