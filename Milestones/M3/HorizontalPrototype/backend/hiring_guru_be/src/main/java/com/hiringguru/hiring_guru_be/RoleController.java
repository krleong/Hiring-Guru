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
    @PutMapping({"/companies/{roleid}/roles"})//updates role information
    public void updateRole(@PathVariable int roleid,@RequestParam("title") String title, @RequestParam("expectations") String expectations, @RequestParam("benefits") String benefits) {
        Role role= rorepo.findById(roleid).get();
        role.title=title;
        role.expectations=expectations;
        role.benefits=benefits;

        this.rorepo.save(role);
    }

    @GetMapping({"/companies/roles"})//gets all role information
    public List<Role> getRoles() {
        List<Role>roles=this.rorepo.queryRoles();
        return roles;
    }

    @GetMapping({"/companies/{roleid}/roles"})//gets role information that matches a certain ID
    public ResponseEntity<Role> getRoleById(@PathVariable int roleid) {
        Optional<Role> role = this.rorepo.findById(roleid);
        return ResponseEntity.of(role);
    }


    @DeleteMapping({"/companies/{roleid}/roles"})//delete a role that matches a certain ID
    public String deleteRoleById(@PathVariable int roleid ) {
      rorepo.deleteRole(roleid);

        return "Deleted Succesfully!";

    }
}