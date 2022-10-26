package com.hiringguru.hiring_guru_be.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Company {
    public Company(String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String title;

    private String description;

    public Company() {
    }
}