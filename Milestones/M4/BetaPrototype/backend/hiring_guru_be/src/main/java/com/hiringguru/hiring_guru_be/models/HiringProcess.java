package com.hiringguru.hiring_guru_be.models;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "HiringProcesses"
)
@EntityListeners(AuditingEntityListener.class)
public class HiringProcess {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "iduser", unique = true, nullable = false)
//    private Long iduser;
    @Id
    @GeneratedValue
    private Long id;
    @LastModifiedDate
    @Column(name = "lastUpdated")
    LocalDateTime lastUpdated;
    @OneToOne(mappedBy = "hiringProcess")
    private Role role;

    @Override
    public String toString() {
        return "HiringProcess{" +
                "id=" + id +
                ", lastUpdated=" + lastUpdated +
                ", role=" + role +
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public HiringProcess() {
    }

    public HiringProcess(LocalDateTime lastUpdated, Role role) {
        this.lastUpdated = lastUpdated;
        this.role = role;
    }
}