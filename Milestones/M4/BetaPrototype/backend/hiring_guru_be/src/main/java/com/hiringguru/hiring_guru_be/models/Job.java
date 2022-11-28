package com.hiringguru.hiring_guru_be.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(
        name = "job"
)
public class Job {
    @Id
    @GeneratedValue
    private int id;
    @Column(
            nullable = false
    )
    public String title;
    @Column(
            nullable = false
    )
    public String location;
    @Column(
            nullable = false
    )
    @Enumerated(EnumType.STRING)
    private JobType type;
    @Column(
            nullable = false
    )
    public String description;
    @ManyToOne(
            cascade = {CascadeType.ALL},
            optional = false
    )
    @JoinColumn(
            name = "role_id",
            referencedColumnName = "id"
    )
    private Role role;

    public Job(String title, String location, JobType type, String description, Role role) {
        this.id = this.id;
        this.title = title;
        this.location = location;
        this.type = type;
        this.description = description;
        this.role = role;
    }



    public String getLocation() {
        return this.location;
    }

    public String getDescription() {
        return this.description;
    }

    public int getId() {
        return this.id;
    }

    public JobType getType() {
        return this.type;
    }

    public Role getRole() {
        return this.role;
    }

    public Job() {
    }

}
