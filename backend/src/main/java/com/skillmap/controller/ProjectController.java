package com.skillmap.controller;

import com.skillmap.model.Project;
import com.skillmap.repository.ProjectRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectRepository repo;
    public ProjectController(ProjectRepository r) { this.repo = r; }

    @GetMapping
    public List<Project> list(@RequestParam(required = false) String level) {
        return level == null ? repo.findAll() : repo.findByLevel(level);
    }

    @GetMapping("/{id}")
    public Project get(@PathVariable String id) { return repo.findById(id).orElseThrow(); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public Project create(@RequestBody Project p) { return repo.save(p); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public Project update(@PathVariable String id, @RequestBody Project p) { p.setId(id); return repo.save(p); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) { repo.deleteById(id); }
}
