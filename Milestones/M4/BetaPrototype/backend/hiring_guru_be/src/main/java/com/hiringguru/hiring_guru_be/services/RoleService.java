package com.hiringguru.hiring_guru_be.services;

import com.hiringguru.hiring_guru_be.entities.HiringProcessCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.entities.RoleCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.models.HiringProcess;
import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.repositories.CompanyRepository;
import com.hiringguru.hiring_guru_be.repositories.HiringProcessRepository;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class RoleService {
    @Autowired
    CompanyRepository comprepo;

    @Autowired
    RoleRepository rorepo;
    @Autowired
    HiringProcessRepository hiringProcessRepository;

    public HiringProcess createHiringProcess(int roleId) {

        HiringProcess hiringProcess = new HiringProcess();

        try {
            hiringProcess.setRole(this.rorepo.findById(roleId).get());
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No role found with id %d",roleId));
        }


        return hiringProcessRepository.save(hiringProcess);
    }
    public Role createRole(int companyid, RoleCreateUpdateRequest role) {
        Role newrole = new Role();
        newrole.setTitle(role.title);
        newrole.setExpectations(role.expectations);
        newrole.setBenefits(role.benefits);

        try {
            newrole.setCompany(comprepo.findById(companyid).get());
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Company found with id %d", companyid));
        }


        return rorepo.save(newrole);
    }

    public Role getRoleById(int roleid) {
        try {
            return rorepo.findById(roleid).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No role found with id %d", roleid));
        }
    }

    public Role updateRole(int roleid, RoleCreateUpdateRequest role) {
        Role existingRole;
        try {
            existingRole = rorepo.findById(roleid).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Role found with id %d", roleid));
        }
        if (role.title != null) existingRole.setTitle(role.title);
        if(role.expectations!=null) existingRole.setExpectations(role.expectations);
        if(role.benefits!=null) existingRole.setBenefits(role.benefits);


        return rorepo.save(existingRole);

    }

    public void deleteRoleById(int id) {
        Role existingRole;
        try {
            existingRole = rorepo.findById(id).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No role found with id %d", id));
        }

        rorepo.deleteRole(id);

    }

    public List<Role> getAllRolesForCompanyId(int companyid) {
        try {
            Company c = comprepo.findById(companyid).get();
            return rorepo.findByCompany(c);
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Company found with id %d", companyid));
        }
    }
}