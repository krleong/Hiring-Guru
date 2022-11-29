package com.hiringguru.hiring_guru_be.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

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

    public Company(String title, String description) {
        this.id = this.id;
        this.title = title;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
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
