package com.hiringguru.hiring_guru_be.controllers;

import com.hiringguru.hiring_guru_be.entities.ErrorResponse;
import com.hiringguru.hiring_guru_be.entities.HiringProcessStageCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.entities.RoleCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.models.HiringProcessStage;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import com.hiringguru.hiring_guru_be.services.HiringProcessStageService;
import com.hiringguru.hiring_guru_be.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/v1/roles/{roleId}/hiring-process")
public class HiringProcessStageController {
    @Autowired
    HiringProcessStageService hiringProcessStageService;
    @Autowired
    RoleRepository roleRepository;



    @RequestMapping(value = "/stages", method = RequestMethod.POST)
    public ResponseEntity<?> createHiringProcessStage( @PathVariable int roleId,@RequestBody HiringProcessStageCreateUpdateRequest hps) {
        try {
            return new ResponseEntity<>(hiringProcessStageService.createHiringProcessStage(roleRepository.findById(roleId).get().getHiringProcess().getId(), hps), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/stages", method = RequestMethod.GET)
    public ResponseEntity<?> getAllHiringProcessStages(@PathVariable int roleId) {
        try {
            return new ResponseEntity<>(hiringProcessStageService.getAllHiringProcessStagesForHiringProcessId(roleRepository.findById(roleId).get().getHiringProcess().getId()), HttpStatus.OK);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/stages/{stageId}", method = RequestMethod.PATCH)
    public ResponseEntity<?> updateHiringProcessStage(@PathVariable int roleId, @PathVariable Long stageId ,@RequestBody HiringProcessStageCreateUpdateRequest hps) {
        try {
            return new ResponseEntity<>(hiringProcessStageService.updateHiringProcessStage(stageId,hps), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/stages/{stageId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteHiringProcessStage(@PathVariable Long stageId) {
        try {
            hiringProcessStageService.deleteHiringProcessStageById(stageId);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }




}