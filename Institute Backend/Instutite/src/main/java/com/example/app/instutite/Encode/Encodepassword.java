package com.example.app.instutite.Encode;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Encodepassword {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashed = encoder.encode("admin123"); // your admin password
        System.out.println(hashed);
    }
}
