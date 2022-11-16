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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {
    @Autowired
    private JobRepository jobrepo;
    @Autowired
    private CompanyRepository comprepo;
    @Autowired
    private RoleRepository rorepo;

    @PostMapping({"/companies/{companyid}/roles"})
    @ResponseBody
    public void createRole(@PathVariable int companyid, @RequestParam("title") String title, @RequestParam("expectations") String expectations, @RequestParam("benefits") String benefits){
        Company comp = this.comprepo.findById(companyid).get();
        Role role = new Role(title, expectations, benefits, comp);
        this.rorepo.save(role);
    }
    @PatchMapping({"/companies/{companyid}/roles"})//updates role information
    public void updateRole(@PathVariable int companyid,@RequestParam("title") String title, @RequestParam("expectations") String expectations, @RequestParam("benefits") String benefits) {
        Company comp = this.comprepo.findById(companyid).get();
        Role role = new Role(title, expectations, benefits, comp);
        this.rorepo.save(role);
    }

    @GetMapping({"/companies/roles"})//gets all role information
    public List<Role> getRoles() {
        List<Role>roles=this.rorepo.queryRoles();
        return roles;
    }

    @GetMapping({"/companies/{companyid}/roles"})//gets role information that matches a certain ID
    public ResponseEntity<Role> getRoleById(@PathVariable int companyid) {
        Optional<Role> role = this.rorepo.findById(companyid+1);
        return ResponseEntity.of(role);
    }
    @GetMapping({"/companies/{companyid}/roles/search"})//searches to see if a role exists
    public String searchRoles(@PathVariable int companyid){
        boolean bool= rorepo.existsById(companyid+1);
        if(bool)
            return "Found a role with a matching id!";

        return "Unable to find a role with requested id!";

    }

    @DeleteMapping({"/companies/{companyid}/roles"})//delete a role that matches a certain ID
    public String deleteRoleById(@PathVariable int companyid ) {
        Role role = this.rorepo.findById(companyid+1).get();
        Company company = this.comprepo.findById(companyid).get();
        comprepo.save(company);
        rorepo.save(role);
        this.rorepo.deleteById(companyid+1);
        this.comprepo.deleteById(companyid);

        return "Deleted Succesfully!";

    }
}