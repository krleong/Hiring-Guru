package com.hiringguru.hiring_guru_be.controllers;

import com.hiringguru.hiring_guru_be.entities.ErrorResponse;
import com.hiringguru.hiring_guru_be.entities.HiringProcessCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.entities.HiringProcessStageCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import com.hiringguru.hiring_guru_be.services.HiringProcessService;
import com.hiringguru.hiring_guru_be.services.HiringProcessStageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/v1/roles/{roleId}/")
public class HiringProcessController {
    @Autowired
    HiringProcessService hiringProcessService;
    @Autowired
    RoleRepository roleRepository;


    @RequestMapping(value = "/hiring-process", method = RequestMethod.POST)
    public ResponseEntity<?> createHiringProcess(@PathVariable int roleId, @RequestBody HiringProcessCreateUpdateRequest hpReq) {
        try {
            return new ResponseEntity<>(hiringProcessService.createHiringProcess(roleId, hpReq), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }


}
