package com.hiringguru.hiring_guru_be.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Table(
        name = "company"
)
public class Company {
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
    public String description;

    @OneToMany(
            cascade = {CascadeType.DETACH},orphanRemoval=true,mappedBy="company"
    )
    private List<Role> role;
    @OneToMany(
            cascade = {CascadeType.DETACH},orphanRemoval=true,mappedBy="company"
    )
    private List<Employee> employee;


    public Company(String title, String description) {
        this.id = this.id;
        this.title = title;
        this.description = description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public int getId() {
        return id;
    }

    public String getTitle(){
        return this.title;
   }

    public String getDescription() {
        return this.description;
    }

    public Company() {
    }
}
