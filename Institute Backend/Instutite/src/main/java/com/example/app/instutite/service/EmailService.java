package com.example.app.instutite.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async("taskExecutor")
    public void sendOtpMail(String to, String otp) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject("Your OTP Verification");
            msg.setText(
                    "Your OTP is: " + otp +
                            "\nValid for 10 minutes.\n\nDo not share this OTP."
            );
            mailSender.send(msg);
        } catch (Exception e) {
            System.err.println("Email send failed for: " + to);
        }
    }
}

