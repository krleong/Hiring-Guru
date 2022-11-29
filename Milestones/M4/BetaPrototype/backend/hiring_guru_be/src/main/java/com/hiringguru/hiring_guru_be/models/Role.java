package com.hiringguru.hiring_guru_be.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(
        name = "role"
)
public class Role {
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    public int id;
    @Column(
            nullable = false
    )
    public String title;
    @Column(
            nullable = false
    )
    public  String expectations;
    @Column(
            nullable = false
    )
    public  String benefits;
    @ManyToOne(
            cascade = {CascadeType.ALL},
            optional = false
    )
    @JoinColumn(
            name = "company_id",
            referencedColumnName = "id"
    )
    public Company company;

    public Role() {
    }

    public Role(String title, String expectations, String benefits, Company company) {
        this.id = this.id;
        this.title = title;
        this.expectations = expectations;
        this.benefits = benefits;
        this.company = company;

    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public void setExpectations(String expectations) {
        this.expectations = expectations;
    }

    public int getId() {
        return id;
    }

    public String getTitle(){
        return this.title;
  }

    public String getExpectations() {
        return this.expectations;
    }

    public String getBenefits() {
        return this.benefits;
    }

    public Company getCompany() {
        return company;
    }
}
