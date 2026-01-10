package com.example.app.instutite.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice

public class GlobalExceptionHandler {

        // Handle custom ApiException
        @ExceptionHandler(ApiException.class)
        public ResponseEntity<Map<String, Object>> handleApiException(ApiException ex) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", ex.getMessage());
            error.put("status", ex.getStatus());
            return new ResponseEntity<>(error, HttpStatus.valueOf(ex.getStatus()));
        }

        // Handle validation errors
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
            Map<String, String> errors = new HashMap<>();
            ex.getBindingResult().getFieldErrors()
                    .forEach(err -> errors.put(err.getField(), err.getDefaultMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        // Handle generic exceptions
        @ExceptionHandler(Exception.class)
        public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", ex.getMessage());
            error.put("status", 500);
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

