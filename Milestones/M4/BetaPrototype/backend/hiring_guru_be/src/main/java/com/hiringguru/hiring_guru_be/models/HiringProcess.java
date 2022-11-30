package com.hiringguru.hiring_guru_be.models;

import javax.persistence.*;

@Entity
@Table(
        name = "HiringProcesses"
)
public class HiringProcess {
    @Id
    @GeneratedValue
    private Long id;
    @Column(
            nullable = false
    )
    public String lastUpdated;
    @OneToOne(
            cascade = {CascadeType.ALL},
            optional = false
    )
    @JoinColumn(
            name = "role_id",
            referencedColumnName = "id"
    )
    public Role role;

    @Override
    public String toString() {
        return "HiringProcess{" +
                "id=" + id +
                ", lastUpdated='" + lastUpdated + '\'' +
                ", role=" + role +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
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

    public HiringProcess(String lastUpdated, Role role) {
        this.lastUpdated = lastUpdated;
        this.role = role;
    }
}