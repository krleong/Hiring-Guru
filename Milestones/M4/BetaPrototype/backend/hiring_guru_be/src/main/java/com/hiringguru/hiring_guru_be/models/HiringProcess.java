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
        name = "hiring_process"
)
public class hiring_process {
    @Id
    @GeneratedValue
    private int id;
    @Column(
            nullable = false
    )
    public String last_Updated;
    @Column(
            nullable = false
    )
    @JoinColumn(
            name = "role_id",
            referencedColumnName = "id"
    )
 
    public hiring_process() {
    }
 
    public hiring_process(String last_Updated,Role role) {
        this.id = this.id;
        this.last_Updated = last_Updated;
        this.role = role;
 
    }
 
 
    public int getId() {
        return id;
    }
 
    public String getlast_Updated(){
        return this.last_Updated;
  }
   public Role getRole() {
        return this.role;
    }
 
}
