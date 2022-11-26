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
        name = "hiring_process_stage"
)
public class hiring_process_stage {
    @Id
    @GeneratedValue
    private int id;
    @Column(
            nullable = false
    )
    public String title;
    @Column(
            nullable = false
    )
    public  String type;
    @Column(
            nullable = false
    )
    public  String description;
    @ManyToOne(
            cascade = {CascadeType.ALL},
            optional = false
    )
     public String stageNumber;
    @Column(
            nullable = false
    )
   @JoinColumn(
            name = "hiring_process_id",
            referencedColumnName = "id"
    )
 
    public hiring_process() {
    }
 
 
 
    public int getId() {
        return id;
    }
 
    public String getTitle(){
        return this.title;
  }
 
    public String getType() {
        return this.type;
    }
     public int getStageNumber() {
        return id;
    }
 
    public String getDescription() {
        return this.description;
    }
 
    public hiring_process gethiring_process() {
        return hiring_process;
    }
}
