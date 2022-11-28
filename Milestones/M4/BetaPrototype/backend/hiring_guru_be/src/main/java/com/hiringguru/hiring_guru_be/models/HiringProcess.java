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
        name = "HiringProcesses"
)
public class HiringProcess {
    @Id
    @GeneratedValue
    private int id;
    @Column(
            nullable = false
    )
    public String lastUpdated;
    @ManyToOne(
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public HiringProcess(int id, String lastUpdated, Role role) {
        this.id = id;
        this.lastUpdated = lastUpdated;
        this.role = role;
    }
}
