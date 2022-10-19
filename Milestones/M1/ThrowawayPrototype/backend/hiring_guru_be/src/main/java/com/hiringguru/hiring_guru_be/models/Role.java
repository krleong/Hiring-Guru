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
public class Role {
    @Id
    private int id;

    private String title;

    private String description;

    private String[] expectations;

    private String[] benefits;


    public Role() {
    }

    public Role(int id, String title, String description, String[] expectations, String[] benefits) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.expectations = expectations;
        this.benefits = benefits;
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

    public String[] getExpectations() {
        return this.expectations;
    }

    public void setExpectations(String[] expectations) {
        this.expectations = expectations;
    }

    public String[] getBenefits() {
        return this.benefits;
    }

    public void setBenefits(String[] benefits) {
        this.benefits = benefits;
    }

    public Role id(int id) {
        setId(id);
        return this;
    }

    public Role title(String title) {
        setTitle(title);
        return this;
    }

    public Role description(String description) {
        setDescription(description);
        return this;
    }

    public Role expectations(String[] expectations) {
        setExpectations(expectations);
        return this;
    }

    public Role benefits(String[] benefits) {
        setBenefits(benefits);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Role)) {
            return false;
        }
        Role role = (Role) o;
        return id == role.id && Objects.equals(title, role.title) && Objects.equals(description, role.description) && Objects.equals(expectations, role.expectations) && Objects.equals(benefits, role.benefits);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, expectations, benefits);
    }

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", title='" + getTitle() + "'" +
                ", description='" + getDescription() + "'" +
                ", expectations='" + getExpectations() + "'" +
                ", benefits='" + getBenefits() + "'" +
                "}";
    }
}


