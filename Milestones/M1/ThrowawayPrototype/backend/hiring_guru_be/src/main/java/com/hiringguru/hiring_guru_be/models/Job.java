package com.hiringguru.hiring_guru_be.models;
import org.springframework.data.repository.CrudRepository;
import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="job")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="job_id")
    private int jobId;
    @Column(name="title")
    private String title;
    @Column(name="description")
    private String description;

    public Job(int jobId, String title, String description) {
        this.jobId = jobId;
        this.title = title;
        this.description = description;
    }

    public Job() {
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
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

    @Override
    public String toString() {
        return "Job{" +
                "jobId=" + jobId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}