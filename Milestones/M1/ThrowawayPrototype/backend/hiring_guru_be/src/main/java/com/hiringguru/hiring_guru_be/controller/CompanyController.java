package com.hiringguru.hiring_guru_be.controller;
import com.hiringguru.hiring_guru_be.exception.ResourceNotFoundException;
import com.hiringguru.hiring_guru_be.model.Company;
import com.hiringguru.hiring_guru_be.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class CompanyController {
    @Autowired
    private CompanyRepository companyRepository;
    //Get all companies
    @GetMapping("companies")
    public List<Company> getAllCompanys(){
        return this.companyRepository.findAll();
    }
    //Get company by id
    @GetMapping("/companies/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable(value="id") Integer companyId)
        throws ResourceNotFoundException {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(()->new ResourceNotFoundException("Company not found for this id :: " + companyId));
        return ResponseEntity.ok().body(company);


    }
    //Save company
    @PostMapping("companies")
    public Company createCompany(@RequestBody Company company){
        return this.companyRepository.save(company);
    }
    //Update company
    @PutMapping("companies/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable(value = "id") Long companyId,
                                                   @Validated @RequestBody Company companyDetails) throws ResourceNotFoundException {
        Company company = companyRepository.findById(Math.toIntExact(companyId))
                .orElseThrow(()->new ResourceNotFoundException("Company not found for this id :: " + companyId));
        company.setTitle(companyDetails.getTitle());
        company.setDescription(companyDetails.getDescription());
        return ResponseEntity.ok(this.companyRepository.save(company));
    }
    //Delete company
    @DeleteMapping("companies/{id}")
    public Map<String, Boolean> deleteCompany(@PathVariable(value = "id") Long companyId) throws ResourceNotFoundException {
        Company company = companyRepository.findById(Math.toIntExact(companyId))
                .orElseThrow(()->new ResourceNotFoundException("Company not found for this id :: " + companyId));
        this.companyRepository.delete(company);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
