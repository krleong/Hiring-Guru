package com.hiringguru.hiring_guru_be;

import com.hiringguru.hiring_guru_be.models.*;
import com.hiringguru.hiring_guru_be.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.models.JobType;
import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.repositories.CompanyRepository;
import com.hiringguru.hiring_guru_be.repositories.JobRepository;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/roles/{roleid}/hiring-process")
public class HiringProcessStageController {
    @Autowired
    private HiringProcessStageRepository hiringProcessStageRepository;
    @Autowired
    private HiringProcessRepository hiringProcessRepository;
    @Autowired
    private RoleRepository roleRepository;

    @PostMapping({"/stages"})
    @ResponseBody
    public void createStage(@PathVariable int stageId, @RequestParam("title") String title, @RequestParam("type") String type, @RequestParam("description") String description){
        HiringProcess hiringProcess = this.hiringProcessStageRepository.findById(stageId).get().hiringProcess;
        HiringProcessStage hiringProcessStage = new HiringProcessStage(stageId, title, type, description, hiringProcess);
        this.hiringProcessStageRepository.save(hiringProcessStage);
    }
    @DeleteMapping({"/stages/{stageId}"})//delete a stage that matches a certain ID
    public String deleteStageById(@PathVariable int stageId) {
        hiringProcessStageRepository.deleteById(stageId);
        return "Deleted Succesfully!";

    }
    @GetMapping({"/stages"})//gets all stages information
    public List<HiringProcessStage> getHiringProcessStage() {
        List<HiringProcessStage>stages=this.hiringProcessStageRepository.queryHiringProcessStage();
        return stages;
    }
    @PatchMapping({"/stages/{stageId}"})//updates an existing stage
    public void updateStage(@PathVariable int stageId,@RequestParam("title") String title, @RequestParam("type") String type, @RequestParam("description") String description) {
        HiringProcess hiringProcess = this.hiringProcessStageRepository.findById(stageId).get().getHiringProcess();
        HiringProcessStage hiringProcessStage = new HiringProcessStage(stageId,title,type,description,hiringProcess);
        this.hiringProcessStageRepository.save(hiringProcessStage);
    }

}