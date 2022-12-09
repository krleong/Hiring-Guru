package com.hiringguru.hiring_guru_be;

import com.hiringguru.hiring_guru_be.entities.RoleCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.entities.ErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.persistence.EntityNotFoundException;

import com.hiringguru.hiring_guru_be.services.RoleService;

@RestController
public class RoleController {
    @Autowired
    RoleService roleService;



    @RequestMapping(value = "/companies/{companyid}/roles", method = RequestMethod.POST)
    public ResponseEntity<?> createRole( @PathVariable int companyid,@RequestBody RoleCreateUpdateRequest role) {
        try {
            return new ResponseEntity<>(roleService.createRole(companyid,role), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/companies/{companyid}/roles/{roleid}", method = RequestMethod.GET)
    public ResponseEntity<?> getRole(@PathVariable int roleid) {
        try {
            return new ResponseEntity<>(roleService.getRoleById(roleid), HttpStatus.OK);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/companies/roles", method = RequestMethod.GET)
    public ResponseEntity<?> getAllRoles() {
        try {
            return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping(value = "/companies/{companyid}/roles", method = RequestMethod.GET)
    public ResponseEntity<?> getAllRoles(@PathVariable int companyid) {
        try {
            return new ResponseEntity<>(roleService.getAllRolesForCompanyId(companyid), HttpStatus.OK);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
   


    @RequestMapping(value = "/companies/{companyid}/roles/{roleid}", method = RequestMethod.PATCH)
    public ResponseEntity<?> updateRole(@PathVariable int companyid, @PathVariable int roleid,  @RequestBody RoleCreateUpdateRequest role) {
        try {
            return new ResponseEntity<>(roleService.updateRole(roleid, role), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/companies/{companyid}/roles/{roleid}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteRole(@PathVariable int roleid) {
        try {
            roleService.deleteRoleById(roleid);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }




}
