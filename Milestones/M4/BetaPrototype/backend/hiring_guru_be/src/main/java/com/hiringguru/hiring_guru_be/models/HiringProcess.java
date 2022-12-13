package com.hiringguru.hiring_guru_be.models;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(
        name = "hiring_processes"
)
@EntityListeners(AuditingEntityListener.class)
public class HiringProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;
    @Column(
            nullable = false
    )
    @LastModifiedDate
    private LocalDateTime lastUpdated;

    @OneToMany(
            cascade = {CascadeType.DETACH},orphanRemoval=true,mappedBy="hiringProcess"
    )
    private List<HiringProcessStage> hiringProcessStages;
    @Override
    public String toString() {
        return "HiringProcess{" +
                "id=" + id +
                ", lastUpdated='" + lastUpdated + '\'' +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }


    public HiringProcess() {
    }

    public HiringProcess(LocalDateTime lastUpdated, Role role) {
        this.lastUpdated = lastUpdated;
    }
}