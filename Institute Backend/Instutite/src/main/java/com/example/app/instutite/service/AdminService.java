package com.example.app.instutite.service;


import com.example.app.instutite.entity.Admin;

public interface AdminService {

    Admin login(String email, String password);

    Admin saveAdmin(Admin admin);

    Admin getAdminProfile();
}
