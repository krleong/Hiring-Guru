package com.hiringguru.hiring_guru_be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.List;


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
            cascade = {CascadeType.DETACH},
            optional = false
    )
    @JoinColumn(
            name = "company_id",
            referencedColumnName = "id"
    )
    public Company company;

    public HiringProcess getHiringProcess() {
        return hiringProcess;
    }

    public void setHiringProcess(HiringProcess hiringProcess) {
        this.hiringProcess = hiringProcess;
    }

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "hiring_process_id", referencedColumnName = "id")
    @JsonIgnore
    private HiringProcess hiringProcess;

    @OneToMany(
            cascade = {CascadeType.DETACH},orphanRemoval=true,mappedBy="role"
    )
    private List<Job> job;

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

    public void setExpectations(String expectations) {
        this.expectations = expectations;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
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