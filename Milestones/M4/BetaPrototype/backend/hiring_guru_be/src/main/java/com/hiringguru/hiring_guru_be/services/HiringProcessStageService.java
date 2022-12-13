package com.hiringguru.hiring_guru_be.services;

import com.hiringguru.hiring_guru_be.entities.HiringProcessStageCreateUpdateRequest;
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

    public HiringProcessStage createHiringProcessStage(int roleId, HiringProcessStageCreateUpdateRequest hpsReq) {

        HiringProcessStage hiringProcessStage = new HiringProcessStage();
        hiringProcessStage.setTitle(hpsReq.title);
        hiringProcessStage.setType(hpsReq.type);
        hiringProcessStage.setDescription(hpsReq.description);
        hiringProcessStage.setIndex(hiringProcessStageRepository.countByHiringProcessRoleId(roleId));
        HiringProcess h = hiringProcessRepository.getByRoleId(roleId);
        try {
            hiringProcessStage.setHiringProcess(h);
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No HiringProcess found with role-id %d",roleId));
        }
        return hiringProcessStageRepository.save(hiringProcessStage);
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

    public List<HiringProcessStage> getAllHiringProcessStagesForRoleId(int roleId) {
        try {
            return hiringProcessStageRepository.findByHiringProcessRoleIdOrderByIndex(roleId);
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No HiringProcess found with role-id %d", roleId));
        }
    }

    public void deleteHiringProcessStageById(Long id) {
       HiringProcessStage existingHiringProcessStage;
        try {
           existingHiringProcessStage = hiringProcessStageRepository.findById(id).get();
       }
       catch (NoSuchElementException e) {
           throw new EntityNotFoundException(String.format("No HiringProcessStage found with id %d", id));
       }

      hiringProcessStageRepository.delete(existingHiringProcessStage);

  }
}