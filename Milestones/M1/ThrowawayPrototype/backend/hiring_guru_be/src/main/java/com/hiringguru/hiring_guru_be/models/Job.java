package main.java.com.hiringguru.hiring_guru_be.models;

public class Job {
    private Long id;

    public Job(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Job{" +
                "id=" + id +
                '}';
    }
}
