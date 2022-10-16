package main.java.com.hiringguru.hiring_guru_be.entities;
import org.springframework.data.repository.CrudRepository;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

@Entity
public class Position {
    @Id
    private int id;

    private String title;

    private String description;

    private String location;

}

    public Position() {
    }

    public Position(int id, String title, String description, String location) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Position id(int id) {
        setId(id);
        return this;
    }

    public Position title(String title) {
        setTitle(title);
        return this;
    }

    public Position description(String description) {
        setDescription(description);
        return this;
    }

    public Position location(String location) {
        setLocation(location);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Position)) {
            return false;
        }
        Position position = (Position) o;
        return id == position.id && Objects.equals(title, position.title) && Objects.equals(description, position.description) && Objects.equals(location, position.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, location);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", location='" + getLocation() + "'" +
            "}";
    }


