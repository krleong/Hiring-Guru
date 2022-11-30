package com.hiringguru.hiring_guru_be;
import com.hiringguru.hiring_guru_be.entities.CompanyCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.entities.ErrorResponse;
import com.hiringguru.hiring_guru_be.models.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import com.hiringguru.hiring_guru_be.services.CompanyService;
import java.util.NoSuchElementException;

@RestController
public class CompanyController {
    @Autowired
    CompanyService companyService;


    @RequestMapping(value = "/companies", method = RequestMethod.POST)
    public ResponseEntity<?> createCompany(@RequestBody CompanyCreateUpdateRequest comp) {
        try {
            return new ResponseEntity<>(companyService.createCompany(comp), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/companies/{companyid}", method = RequestMethod.GET)
    public ResponseEntity<?> getCompanyById(@PathVariable int companyid) {
        try {
            return new ResponseEntity<>(companyService.getCompany(companyid), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

   @RequestMapping(value = "/companies", method = RequestMethod.GET)
    public ResponseEntity<?> getAllCompanies() {
        try {
            return new ResponseEntity<>(companyService.getAllCompanies(), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/companies/{companyid}", method = RequestMethod.PATCH)
    public ResponseEntity<?> updateCompany(@PathVariable int companyid, @RequestBody CompanyCreateUpdateRequest comp) {
        try {
            return new ResponseEntity<>(companyService.updateCompany(companyid, comp), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/companies/{companyid}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteCompany(@PathVariable int companyid) {
        try {
            companyService.deleteCompanyById(companyid);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}