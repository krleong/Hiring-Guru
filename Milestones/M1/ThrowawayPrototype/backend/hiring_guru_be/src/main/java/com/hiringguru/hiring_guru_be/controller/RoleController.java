package com.hiringguru.hiring_guru_be.controller;
import com.hiringguru.hiring_guru_be.exception.ResourceNotFoundException;
import com.hiringguru.hiring_guru_be.model.Role;
import com.hiringguru.hiring_guru_be.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;
    //Get all roles
    @GetMapping("roles")
    public List<Role> getAllRoles(){
        return this.roleRepository.findAll();
    }
    //Get role by id
    @GetMapping("/roles/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable(value="id") Integer roleId)
        throws ResourceNotFoundException {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(()->new ResourceNotFoundException("Role not found for this id :: " + roleId));
        return ResponseEntity.ok().body(role);


    }
    //Save role
    @PostMapping("roles")
    public Role createRole(@RequestBody Role role){
        return this.roleRepository.save(role);
    }
    //Update role
    @PutMapping("roles/{id}")
    public ResponseEntity<Role> updateRole(@PathVariable(value = "id") Long roleId,
                                                   @Validated @RequestBody Role roleDetails) throws ResourceNotFoundException {
        Role role = roleRepository.findById(Math.toIntExact(roleId))
                .orElseThrow(()->new ResourceNotFoundException("Role not found for this id :: " + roleId));
        role.setTitle(roleDetails.getTitle());
        role.setExpectations(roleDetails.getExpectations());
        role.setBenefits(roleDetails.getBenefits());
        return ResponseEntity.ok(this.roleRepository.save(role));
    }
    //Delete role
    @DeleteMapping("roles/{id}")
    public Map<String, Boolean> deleteRole(@PathVariable(value = "id") Long roleId) throws ResourceNotFoundException {
        Role role = roleRepository.findById(Math.toIntExact(roleId))
                .orElseThrow(()->new ResourceNotFoundException("Role not found for this id :: " + roleId));
        this.roleRepository.delete(role);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
