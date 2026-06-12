package com.skillmap.controller;

import com.skillmap.model.Resource;
import com.skillmap.repository.ResourceRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {
    private final ResourceRepository repo;
    public ResourceController(ResourceRepository r) { this.repo = r; }

    @GetMapping
    public List<Resource> list(@RequestParam(required = false) String tech) {
        return tech == null ? repo.findAll() : repo.findByTech(tech);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public Resource create(@RequestBody Resource r) { return repo.save(r); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public Resource update(@PathVariable String id, @RequestBody Resource r) { r.setId(id); return repo.save(r); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) { repo.deleteById(id); }
}
