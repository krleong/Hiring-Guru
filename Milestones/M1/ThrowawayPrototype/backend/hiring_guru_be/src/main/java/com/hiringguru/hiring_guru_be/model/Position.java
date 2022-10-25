package com.hiringguru.hiring_guru_be.model;

import javax.persistence.*;

@Entity
@Table(name="positions")
public class Position {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    @Column(name = "type")
    private String type;
    @Column(name = "description")
    private String description;
    @Column(name = "location")
    private String location;
    @Column(name = "title")
    private String title;

    @Override
    public String toString() {
        return "Position{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", title='" + title + '\'' +
                '}';
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Position(long id, String type, String description, String location, String title) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.location = location;
        this.title = title;
    }

    public Position() {
    }
}
