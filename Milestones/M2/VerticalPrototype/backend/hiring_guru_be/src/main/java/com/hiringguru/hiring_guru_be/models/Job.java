package com.hiringguru.hiring_guru_be.models;
import javax.persistence.*;

@Entity
public class Job {
    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private JobType type;

    @Column(nullable = false)
    private String description;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    private Role role;

    public Job(String title, String location, JobType type, String description, Role role) {
        this.title = title;
        this.location = location;
        this.type = type;
        this.description = description;
        this.role = role;
    }

    public Job() {
    }
}