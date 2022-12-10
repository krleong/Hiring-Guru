package com.hiringguru.hiring_guru_be.services;

import com.hiringguru.hiring_guru_be.entities.CompanyCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CompanyService {
    @Autowired
    CompanyRepository comprepo;

    public Company createCompany(CompanyCreateUpdateRequest comp) {
        Company newcomp = new Company(comp.title, comp.description);

        try {
            comprepo.save(newcomp);

        } catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("Unable to create company!"));
        }

        return newcomp;

    }

    public Company getCompanyById(int companyid) {
        try {
            return comprepo.findById(companyid).get();
        } catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Company found with id %d", companyid));
        }
    }

    public Company updateCompany(int companyid, CompanyCreateUpdateRequest comp) {
        Company existingCompany;
        try {
            existingCompany = comprepo.findById(companyid).get();
        } catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No company found with id %d", companyid));
        }
        if (comp.title != null) existingCompany.setTitle(comp.title);
        if (comp.description != null) existingCompany.setDescription(comp.description);

        return comprepo.save(existingCompany);
    }

    public void deleteCompanyById(int id) {
        Company existingCompany;
        try {
            existingCompany = comprepo.findById(id).get();
        } catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Company found with id %d", id));
        }

           comprepo.delete(existingCompany);

    }

    public Company getCompany(int companyid) {
        try {
            Company c = comprepo.findById(companyid).get();
            return c;
        } catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Company found with id %d", companyid));
        }

    }

    public List<Company> getAllCompanies() {
        try {
            return comprepo.queryCompany();
        } catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("Unable to get company information"));

        }
    }
}