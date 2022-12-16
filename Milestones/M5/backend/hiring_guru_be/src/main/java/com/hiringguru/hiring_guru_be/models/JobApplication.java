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
    public String applicant_name;
    @Column(
            nullable = false
    )
    public String applicant_email;
    @Column(
            nullable = false
    )
    public String applicant_resume;
    @Column(
            nullable = false
    )
    public String applicant_profile_link;
    @Column(
            nullable = false
    )
    public String submitted_at;
    @Column(
            nullable = false
    )
    public String cover_letter;
    @Column(
            nullable = false
    )
    public String phone;
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

    public Job getJob() {
        return job;
    }

    public String getApplicantEmail() {
        return applicant_email;
    }

    public String getApplicantName() {
        return applicant_name;
    }

    public String getApplicantProfileLink() {
        return applicant_profile_link;
    }

    public String getApplicantResume() {
        return applicant_resume;
    }

    public String getCoverLetter() {
        return cover_letter;
    }

    public String getPhone() {
        return phone;
    }

    public String getSubmittedAt() {
        return submitted_at;
    }

    public void setApplicantEmail(String applicant_email) {
        this.applicant_email = applicant_email;
    }

    public void setApplicantName(String applicant_name) {
        this.applicant_name = applicant_name;
    }

    public void setApplicantProfileLink(String applicant_profile_link) {
        this.applicant_profile_link = applicant_profile_link;
    }

    public void setApplicantResume(String applicant_resume) {
        this.applicant_resume = applicant_resume;
    }

    public void setCoverLetter(String cover_letter) {
        this.cover_letter = cover_letter;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setSubmittedAt(String submitted_at) {
        this.submitted_at = submitted_at;
    }




    public JobApplication() {
    }

    public JobApplication(String applicantName, String applicantEmail, String applicantResume, String applicantProfileLink, String submittedAt, String coverLetter, String phone, Job job) {
        this.id = id;
        this.applicant_name = applicantName;
        this.applicant_email = applicantEmail;
        this.applicant_resume = applicantResume;
        this.applicant_profile_link = applicantProfileLink;
        this.submitted_at = submittedAt;
        this.cover_letter = coverLetter;
        this.phone = phone;
        this.job = job;
    }
}
