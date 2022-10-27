package com.hiringguru.hiring_guru_be.model;

import javax.persistence.*;

@Entity
@Table(name="companies")
public class Company {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Company() {
    }

    public Company(long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Company{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
