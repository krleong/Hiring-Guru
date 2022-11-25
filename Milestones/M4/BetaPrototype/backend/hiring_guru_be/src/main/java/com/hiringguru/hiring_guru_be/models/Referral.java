package com.hiringguru.hiring_guru_be.models;

import javax.persistence.*;

@Entity
@Table(
        name = "referrals"
)
public class Referral {
    @Id
    @GeneratedValue
    private int id;
    @Column(
            nullable = false
    )
    public String referralComments;
    @Column(
            nullable = false
    )
    public String referralReview;
    @ManyToOne(
            cascade = {CascadeType.ALL},
            optional = false
    )
    @JoinColumn(
            name = "jobApp_id",
            referencedColumnName = "id"
    )
    private JobApplication jobApplication;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getReferralComments() {
        return referralComments;
    }

    public void setReferralComments(String referralComments) {
        this.referralComments = referralComments;
    }

    public String getReferralReview() {
        return referralReview;
    }

    public void setReferralReview(String referralReview) {
        this.referralReview = referralReview;
    }

    public JobApplication getJobApplication() {
        return jobApplication;
    }

    public void setJobApplication(JobApplication jobApplication) {
        this.jobApplication = jobApplication;
    }

    @Override
    public String toString() {
        return "Referral{" +
                "id=" + id +
                ", referralComments='" + referralComments + '\'' +
                ", referralReview='" + referralReview + '\'' +
                ", jobApplication=" + jobApplication +
                '}';
    }

    public Referral(int id, String referralComments, String referralReview, JobApplication jobApplication) {
        this.id = id;
        this.referralComments = referralComments;
        this.referralReview = referralReview;
        this.jobApplication = jobApplication;
    }

    public Referral() {
    }
}
