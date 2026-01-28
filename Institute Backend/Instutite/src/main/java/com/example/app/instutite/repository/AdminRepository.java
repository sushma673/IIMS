package com.example.app.instutite.repository;


import com.example.app.instutite.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Admin findByEmailAndPassword(String email, String password);
    Admin findTopByOrderByIdAsc();
}
