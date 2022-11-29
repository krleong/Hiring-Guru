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



    @RequestMapping(value = "/companies", method = RequestMethod.POST)
    public ResponseEntity<?> createCompany (@RequestBody CompnayCreateUpdateRequest comp) {
        try {
            return new ResponseEntity<>(employeeService.createEmployee(companyId, emp), HttpStatus.OK);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }



        @RequestMapping(value = "/companies", method = RequestMethod.GET)
        public ResponseEntity<?> getEmployee(@PathVariable Long companyid) {
            try {
                return new ResponseEntity<>(employeeService.getEmployeeById(companyid), HttpStatus.OK);
            }
            catch (EntityNotFoundException e) {
                return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
            }
        }


        @RequestMapping(value = "/companies", method = RequestMethod.PATCH)
        public ResponseEntity<?> updateEmployee(@PathVariable Long companyid,@RequestBody CompanyCreateUpdateRequest comp
    ) {
            try {
                return new ResponseEntity<>(employeeService.updateEmployee(employeeId, emp), HttpStatus.OK);
            }
            catch (EntityNotFoundException e) {
                return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
            }
        }




    @DeleteMapping({"/companies/{companyid}"})//delete a company that matches a certain ID
    public String deleteCompanyById(@PathVariable int companyid) {
        comprepo.deleteCompany(companyid);

        return "Deleted Succesfully!";


    }
}