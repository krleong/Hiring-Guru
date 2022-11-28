package com.hiringguru.hiring_guru_be.models;

import javax.persistence.*;

@Entity
@Table(
        name = "job_applications"
)
public class JobApplication {
    @Id
    @GeneratedValue
    private int id;
    @Column(
            nullable = false
    )
    public String applicantName;
    @Column(
            nullable = false
    )
    public String applicantEmail;
    @Column(
            nullable = false
    )
    public String applicantResume;
    @Column(
            nullable = false
    )
    public String applicantProfileLink;
    @Column(
            nullable = false
    )
    public String submittedAt;
    @Column(
            nullable = false
    )
    public String coverLetter;
    @Column(
            nullable = false
    )
    public int phone;
    @ManyToOne(
            cascade = {CascadeType.ALL},
            optional = false
    )
    @JoinColumn(
            name = "job_id",
            referencedColumnName = "id"
    )
    private Job job;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getApplicantEmail() {
        return applicantEmail;
    }

    public void setApplicantEmail(String applicantEmail) {
        this.applicantEmail = applicantEmail;
    }

    public String getApplicantResume() {
        return applicantResume;
    }

    public void setApplicantResume(String applicantResume) {
        this.applicantResume = applicantResume;
    }

    public String getApplicantProfileLink() {
        return applicantProfileLink;
    }

    public void setApplicantProfileLink(String applicantProfileLink) {
        this.applicantProfileLink = applicantProfileLink;
    }

    public String getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(String submittedAt) {
        this.submittedAt = submittedAt;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    @Override
    public String toString() {
        return "JobApplication{" +
                "id=" + id +
                ", applicantName='" + applicantName + '\'' +
                ", applicantEmail='" + applicantEmail + '\'' +
                ", applicantResume='" + applicantResume + '\'' +
                ", applicantProfileLink='" + applicantProfileLink + '\'' +
                ", submittedAt='" + submittedAt + '\'' +
                ", coverLetter='" + coverLetter + '\'' +
                ", phone=" + phone +
                ", job=" + job +
                '}';
    }

    public JobApplication() {
    }

    public JobApplication(int id, String applicantName, String applicantEmail, String applicantResume, String applicantProfileLink, String submittedAt, String coverLetter, int phone, Job job) {
        this.id = id;
        this.applicantName = applicantName;
        this.applicantEmail = applicantEmail;
        this.applicantResume = applicantResume;
        this.applicantProfileLink = applicantProfileLink;
        this.submittedAt = submittedAt;
        this.coverLetter = coverLetter;
        this.phone = phone;
        this.job = job;
    }
}
