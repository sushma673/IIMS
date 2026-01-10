package com.example.app.instutite.exception;

public class ApiException extends RuntimeException {

        private int status;

        public ApiException(String message) {
            super(message);
            this.status = 400; // default Bad Request
        }

        public ApiException(String message, int status) {
            super(message);
            this.status = status;
        }

        public int getStatus() {
            return status;
        }
    }


