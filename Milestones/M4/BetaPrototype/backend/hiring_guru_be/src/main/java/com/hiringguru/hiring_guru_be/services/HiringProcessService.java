package com.hiringguru.hiring_guru_be.services;

import com.hiringguru.hiring_guru_be.entities.HiringProcessCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.entities.HiringProcessStageCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.models.HiringProcess;
import com.hiringguru.hiring_guru_be.models.HiringProcessStage;
import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.repositories.HiringProcessRepository;
import com.hiringguru.hiring_guru_be.repositories.HiringProcessStageRepository;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class HiringProcessService {

    @Autowired
    RoleRepository roleRepository;
    @Autowired
    HiringProcessRepository hiringProcessRepository;
    
    

    public HiringProcess createHiringProcess(int roleId, HiringProcessCreateUpdateRequest hpReq) {

        HiringProcess hiringProcess = new HiringProcess();
        hiringProcess.setLastUpdated(hpReq.lastUpdated);
        hiringProcess.setRole(this.roleRepository.findById(roleId).get());


        try {
            hiringProcessRepository.save(hiringProcess);
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No role found with id %d",roleId));
        }

        return hiringProcessRepository.save(hiringProcess);
    }
}
