package com.hiringguru.hiring_guru_be;

import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.models.JobType;
import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.repositories.CompanyRepository;
import com.hiringguru.hiring_guru_be.repositories.JobRepository;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.Optional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CompanyController {
    @Autowired
    private JobRepository jobrepo;
    @Autowired
    private CompanyRepository comprepo;
    @Autowired
    private RoleRepository rorepo;


    @PostMapping({"/companies"})//creates a company
    @ResponseBody
    public void createCompany(@RequestParam("title") String title, @RequestParam("description") String description){
        Company comp = new Company(title,description);
        this.comprepo.save(comp);
    }
    @PatchMapping({"/companies/{companyid}"})//updates an existing company
    public void updateJobPartially(@PathVariable int companyid, @RequestParam("title")String title, @RequestParam("description") String description){
        Company comp = this.comprepo.findById(companyid).get();
        comp.title=title;
        comp.description=description;
        this.comprepo.save(comp);
    }


    @GetMapping({"/companies"})//gets all company information
    public List<Company> getCompany() {
        List<Company>companies=this.comprepo.queryCompany();
        return companies;
    }

    @GetMapping({"/companies/{companyid}"})//gets company information that matches certain information
    public ResponseEntity<Company> getCompanyById(@PathVariable int companyid) {
        Optional<Company> company = this.comprepo.findById(companyid);
        return ResponseEntity.of(company);
    }


    @DeleteMapping({"/companies/{companyid}"})//delete a company that matches a certain ID
    public String deleteCompanyById(@PathVariable int companyid) {
        comprepo.deleteCompany(companyid);

        return "Deleted Succesfully!";


    }
}