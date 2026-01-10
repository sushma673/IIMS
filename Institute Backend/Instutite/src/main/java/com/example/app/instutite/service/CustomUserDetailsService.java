package com.example.app.instutite.service;

import com.example.app.instutite.entity.User;
import com.example.app.instutite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + email));

        // Convert enum Role to Spring Security authority
        String authority = "ROLE_" + user.getRole().name(); // ENUM → String safely

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(List.of(new SimpleGrantedAuthority(authority)))
                .accountLocked(user.isAccountLocked()) // assuming this field exists
                .disabled(!user.isEnabled())           // assuming this field exists
                .build();
    }
}
