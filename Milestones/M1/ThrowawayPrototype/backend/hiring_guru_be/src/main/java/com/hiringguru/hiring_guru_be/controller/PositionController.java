package com.hiringguru.hiring_guru_be.controller;
import com.hiringguru.hiring_guru_be.exception.ResourceNotFoundException;
import com.hiringguru.hiring_guru_be.model.Position;
import com.hiringguru.hiring_guru_be.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class PositionController {
    @Autowired
    private PositionRepository positionRepository;
    //Get all positions
    @GetMapping("positions")
    public List<Position> getAllPositions(){
        return this.positionRepository.findAll();
    }
    //Get position by id
    @GetMapping("/positions/{id}")
    public ResponseEntity<Position> getPositionById(@PathVariable(value="id") Integer positionId)
        throws ResourceNotFoundException {
        Position position = positionRepository.findById(positionId)
                .orElseThrow(()->new ResourceNotFoundException("Position not found for this id :: " + positionId));
        return ResponseEntity.ok().body(position);


    }
    //Save position
    @PostMapping("positions")
    public Position createPosition(@RequestBody Position position){
        return this.positionRepository.save(position);
    }
    //Update position
    @PutMapping("positions/{id}")
    public ResponseEntity<Position> updatePosition(@PathVariable(value = "id") Long positionId,
                                                   @Validated @RequestBody Position positionDetails) throws ResourceNotFoundException {
        Position position = positionRepository.findById(Math.toIntExact(positionId))
                .orElseThrow(()->new ResourceNotFoundException("Position not found for this id :: " + positionId));
        position.setDescription(positionDetails.getDescription());
        position.setTitle(positionDetails.getTitle());
        position.setType(positionDetails.getType());
        position.setLocation(positionDetails.getLocation());
        return ResponseEntity.ok(this.positionRepository.save(position));
    }
    //Delete position
    @DeleteMapping("positions/{id}")
    public Map<String, Boolean> deletePosition(@PathVariable(value = "id") Long positionId) throws ResourceNotFoundException {
        Position position = positionRepository.findById(Math.toIntExact(positionId))
                .orElseThrow(()->new ResourceNotFoundException("Position not found for this id :: " + positionId));
        this.positionRepository.delete(position);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
