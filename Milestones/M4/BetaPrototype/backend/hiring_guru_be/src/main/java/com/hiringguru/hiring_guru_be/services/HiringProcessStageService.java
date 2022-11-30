package com.hiringguru.hiring_guru_be.services;

import com.hiringguru.hiring_guru_be.entities.HiringProcessStageCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.models.HiringProcessStage;
import com.hiringguru.hiring_guru_be.models.HiringProcessStage;
import com.hiringguru.hiring_guru_be.models.HiringProcess;
import com.hiringguru.hiring_guru_be.repositories.*;
import com.hiringguru.hiring_guru_be.repositories.HiringProcessStageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class HiringProcessStageService {
    @Autowired
    HiringProcessStageRepository hiringProcessStageRepository;

    @Autowired
    RoleRepository roleRepository;
    @Autowired
    HiringProcessRepository hiringProcessRepository;
    
    

    public HiringProcessStage createHiringProcessStage(Long hiringProcessId, HiringProcessStageCreateUpdateRequest hpReq) {
        HiringProcess hiringProcess= hiringProcessRepository.findById(hiringProcessId).get();

        HiringProcessStage hiringProcessStage = new HiringProcessStage();
        hiringProcessStage.setTitle(hpReq.title);
        hiringProcessStage.setType(hpReq.type);
        hiringProcessStage.setDescription(hpReq.description);


        try {
            hiringProcessStageRepository.save(hiringProcessStage);
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No HiringProcess found with id %d",hiringProcessId));
        }

        return hiringProcessStageRepository.save(hiringProcessStage);
    }

    public HiringProcessStage getHiringProcessStageById(Long hpsId) {
        try {
            return hiringProcessStageRepository.findById(hpsId).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No HiringProcessStage found with id %d", hpsId));
        }
    }

    public HiringProcessStage updateHiringProcessStage(Long hpsId, HiringProcessStageCreateUpdateRequest hiringProcessStage) {
        HiringProcessStage existingHiringProcessStage;
        try {
            existingHiringProcessStage = hiringProcessStageRepository.findById(hpsId).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No HiringProcessStage found with id %d", hpsId));
        }
        if (hiringProcessStage.title != null) existingHiringProcessStage.setTitle(hiringProcessStage.title);
        if(hiringProcessStage.type!=null) existingHiringProcessStage.setType(hiringProcessStage.type);
        if(hiringProcessStage.description!=null) existingHiringProcessStage.setDescription(hiringProcessStage.description );


        return hiringProcessStageRepository.save(existingHiringProcessStage);

    }


    public List<HiringProcessStage> getAllHiringProcessStages() {
        try {
            return hiringProcessStageRepository.queryHiringProcessStages();
        } catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("Unable to get HiringProcessStage information"));

        }
    }

    public List<HiringProcessStage> getAllHiringProcessStagesForHiringProcessId(Long hiringProcessid) {
        try {
            HiringProcess hiringProcess = hiringProcessRepository.findById(hiringProcessid).get();
            return hiringProcessStageRepository.findByHiringProcess(hiringProcess);
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No HiringProcess found with id %d", hiringProcessid));
        }
    }
}
