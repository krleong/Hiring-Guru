package com.hiringguru.hiring_guru_be;

import com.hiringguru.hiring_guru_be.models.*;
import com.hiringguru.hiring_guru_be.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/roles/{roleid}/hiring-process")
public class HiringProcessStageController {
    @Autowired
    private HiringProcessStageRepository hiringProcessStageRepository;

    @PostMapping({"/stages"})
    @ResponseBody
    public List<HiringProcessStage> createStage(@PathVariable int stageId, @RequestParam("title") String title, @RequestParam("type") String type, @RequestParam("description") String description){
        HiringProcess hiringProcess = this.hiringProcessStageRepository.findById(stageId).get().hiringProcess;
        HiringProcessStage hiringProcessStage = new HiringProcessStage(stageId, title, type, description, hiringProcess);
        this.hiringProcessStageRepository.save(hiringProcessStage);
        List<HiringProcessStage>stages=this.hiringProcessStageRepository.queryHiringProcessStage();
        return stages;
    }
    @DeleteMapping({"/stages/{stageId}"})//delete a stage that matches a certain ID
    public List<HiringProcessStage> deleteStageById(@PathVariable int stageId) {
        hiringProcessStageRepository.deleteById(stageId);
        List<HiringProcessStage>stages=this.hiringProcessStageRepository.queryHiringProcessStage();
        return stages;

    }
    @GetMapping({"/stages"})//gets all stages information
    public List<HiringProcessStage> getHiringProcessStage() {
        List<HiringProcessStage>stages=this.hiringProcessStageRepository.queryHiringProcessStage();
        return stages;
    }
    @PatchMapping({"/stages/{stageId}"})//  stage
    public List<HiringProcessStage> updateStage(@PathVariable int stageId,@RequestParam("title") String title, @RequestParam("type") String type, @RequestParam("description") String description) {
        HiringProcess hiringProcess = this.hiringProcessStageRepository.findById(stageId).get().getHiringProcess();
        HiringProcessStage hiringProcessStage = new HiringProcessStage(stageId,title,type,description,hiringProcess);
        this.hiringProcessStageRepository.save(hiringProcessStage);
        List<HiringProcessStage>stages=this.hiringProcessStageRepository.queryHiringProcessStage();
        return stages;
    }

}