package com.hiringguru.hiring_guru_be.models;
import javax.persistence.*;

@Entity
public class Role {
    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String title;

    private String expectations;

    private String benefits;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    private Company company;

    public Role() {
    }

    public Role(String title, String expectations, String benefits, Company company) {
        this.title = title;
        this.expectations = expectations;
        this.benefits = benefits;
        this.company = company;
    }
}