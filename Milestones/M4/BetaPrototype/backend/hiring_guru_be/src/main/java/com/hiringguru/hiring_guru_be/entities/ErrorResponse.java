package com.hiringguru.hiring_guru_be.entities;

public class ErrorResponse {
    public String summary;
    public String detail;

    public ErrorResponse(String summary, String detail) {
        this.summary = summary;
        this.detail = detail;
    }

    public ErrorResponse(String detail) {
        this.summary = "Error Occurred";
        this.detail = detail;
    }
}
