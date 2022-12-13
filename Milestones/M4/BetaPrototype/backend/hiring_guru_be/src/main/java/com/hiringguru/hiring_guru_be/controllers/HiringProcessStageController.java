package com.hiringguru.hiring_guru_be.controllers;

import com.hiringguru.hiring_guru_be.entities.HiringProcessStageCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.entities.ErrorResponse;
import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.HiringProcessStage;
import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import com.hiringguru.hiring_guru_be.services.HiringProcessStageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import com.hiringguru.hiring_guru_be.services.RoleService;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/roles/{roleId}/hiring-process")
public class HiringProcessStageController {
    @Autowired
    HiringProcessStageService hiringProcessStageService;
    @Autowired
    RoleRepository roleRepository;


    @RequestMapping(value = "/stages", method = RequestMethod.POST)
    public ResponseEntity<?> createHiringProcessStage(@PathVariable int roleId, @RequestBody HiringProcessStageCreateUpdateRequest hpsReq) {
        try {
            return new ResponseEntity<>(
                    hiringProcessStageService.createHiringProcessStage(roleId,hpsReq),
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/stages", method = RequestMethod.GET)
    public ResponseEntity<?> getAllHiringProcessStagesForRole(@PathVariable int roleId) {
        try {
            return new ResponseEntity<>(
                    hiringProcessStageService.getAllHiringProcessStagesForRoleId(
                            roleId
                    ), HttpStatus.OK
            );
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/stages/{hpstageid}", method = RequestMethod.GET)
    public ResponseEntity<?> getHiringProcess(@PathVariable Long hpstageid) {
        try {
            return new ResponseEntity<>(hiringProcessStageService.getHiringProcessStageById(hpstageid), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(value = "/stages/{hpstageid}", method = RequestMethod.PATCH)
    public ResponseEntity<?> updateHiringProcessStage(@PathVariable int roleId, @PathVariable Long hpstageid, @RequestBody HiringProcessStageCreateUpdateRequest hpsReq  ) {
        try {
            return new ResponseEntity<>(hiringProcessStageService.updateHiringProcessStage(hpstageid, hpsReq), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/stages/{hpstageid}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteHiringProcessStage(@PathVariable Long hpstageid) {
        try {
            hiringProcessStageService. deleteHiringProcessStageById(hpstageid);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}