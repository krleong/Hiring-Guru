package com.hiringguru.hiring_guru_be.models;

import javax.persistence.*;


@Entity
@Table(
        name = "hiring_process_stages"
)
public class HiringProcessStage {
    @Id
    @GeneratedValue
    private Long id;

    @Column(
        nullable = false
    )
    public String title;

    @Column(
        nullable = false
    )
    public HiringProcessStageType type;

    @Column(
        nullable = false
    )
    public String description;

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    @Column(
        nullable = false
    )
    public int index;

    @ManyToOne(
        cascade = {CascadeType.ALL},
        optional = false
    )
    @JoinColumn(
        name = "hiring_process_id",
        referencedColumnName = "id"
    )
    public HiringProcess hiringProcess;

    @Override
    public String toString() {
        return "HiringProcessStage{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", type='" + type + '\'' +
                ", description='" + description + '\'' +
                ", hiringProcess=" + hiringProcess +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public HiringProcessStageType getType() {
        return type;
    }

    public void setType(HiringProcessStageType type) {
        this.type = type;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public HiringProcess getHiringProcess() {
        return hiringProcess;
    }

    public void setHiringProcess(HiringProcess hiringProcess) {
        this.hiringProcess = hiringProcess;
    }

    public HiringProcessStage() {
    }

    public HiringProcessStage(Long id, String title, HiringProcessStageType type, String description,  HiringProcess hiringProcess) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.description = description;
        this.hiringProcess = hiringProcess;
    }
}