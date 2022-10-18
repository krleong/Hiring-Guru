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
public class Job {
    @Id
    private int id;

    private String title;

    private String description;
}