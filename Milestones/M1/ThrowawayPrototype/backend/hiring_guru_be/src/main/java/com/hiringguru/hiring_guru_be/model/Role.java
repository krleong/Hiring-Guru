package com.hiringguru.hiring_guru_be.model;

import javax.persistence.*;

@Entity
@Table(name="roles")
public class Role {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    @Column(name = "title")
    private String title;
    @Column(name = "expectations")
    private String expectations;
    @Column(name = "benefits")
    private String benefits;

    @java.lang.Override
    public java.lang.String toString() {
        return "Role{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", expectations='" + expectations + '\'' +
                ", benefits='" + benefits + '\'' +
                '}';
    }

    public Role() {
    }

    public Role(long id, String title, String expectations, String benefits) {
        this.id = id;
        this.title = title;
        this.expectations = expectations;
        this.benefits = benefits;
    }

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

    public String getExpectations() {
        return expectations;
    }

    public void setExpectations(String expectations) {
        this.expectations = expectations;
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }
}
