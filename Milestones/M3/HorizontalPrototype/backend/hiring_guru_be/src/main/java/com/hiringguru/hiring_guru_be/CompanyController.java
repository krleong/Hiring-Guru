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
    @PatchMapping({"/companies/{id}"})//updates an existing company
    public void updateJobPartially(@PathVariable int id, @RequestParam("title")String title, @RequestParam("description") String description){
        Company comp = this.comprepo.findById(id).get();
        comp.title=title;
        comp.description=description;
        this.comprepo.save(comp);
    }


    @GetMapping({"/companies"})//gets all company information
    public List<Company> getCompany() {
        List<Company>companies=this.comprepo.queryCompany();
        return companies;
    }

    @GetMapping({"/companies/{id}"})//gets company information that matches certain information
    public ResponseEntity<Company> getCompanyById(@PathVariable int id) {
        Optional<Company> company = this.comprepo.findById(id);
        return ResponseEntity.of(company);
    }

    @GetMapping({"/roles/companies/search"})//searches to see if a company exists
    public String searchCompany(int id){
        boolean bool= comprepo.existsById(id);

        if(bool)
            return "Found a company with a matching id!";

        return "Unable to find a company with requested id!";

    }

    @DeleteMapping({"/companies/{id}"})//delete a company that matches a certain ID
    public String deleteCompanyById(@PathVariable int id) {
        Company company = this.comprepo.findById(id).get();
        Role role = this.rorepo.findById(id-1).get();
        comprepo.save(company);
        rorepo.save(role);
        this.rorepo.deleteById(id-1);
       // this.comprepo.deleteById(id);
        return "Deleted Succesfully!";
    }
}