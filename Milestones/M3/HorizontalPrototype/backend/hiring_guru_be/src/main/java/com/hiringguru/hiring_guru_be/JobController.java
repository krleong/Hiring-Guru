//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.hiringguru.hiring_guru_be;

import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.models.JobType;
import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.repositories.CompanyRepository;
import com.hiringguru.hiring_guru_be.repositories.JobRepository;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JobController {
    @Autowired
    private JobRepository jr;
    @Autowired
    private CompanyRepository cr;
    @Autowired
    private RoleRepository rr;

    public JobController() {
    }

    @RequestMapping({"/create-records"})
    public String createRecords() {
        Company c1 = new Company("AWS", "This is Amazon Web Services.");
        Role r1 = new Role("lead Software Engineer", "Lead a team of engineers", "Free medical", c1);
        Job j1 = new Job("Urgent - Need a Java Engineer", "Seattle, WA", JobType.FULL_TIME, "AWS is looking for a Lead Java engineer on urgent basis.", r1);
        this.cr.save(c1);
        this.rr.save(r1);
        this.jr.save(j1);
        return "Welcome to HiringGuru";
    }

    @RequestMapping({"/search-jobs"})
    public void searchForJobs() {
        List<Job> jobs = this.jr.queryJob(JobType.FULL_TIME, "abcd");
        System.out.print(jobs.size());
    }
}