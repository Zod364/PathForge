package com.skillmap.controller;

import com.skillmap.model.Documentation;
import com.skillmap.repository.DocumentationRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/docs")
public class DocumentationController {
    private final DocumentationRepository repo;
    public DocumentationController(DocumentationRepository r) { this.repo = r; }

    @GetMapping
    public List<Documentation> list(@RequestParam(required = false) String tech) {
        return tech == null ? repo.findAll() : repo.findByTech(tech);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public Documentation create(@RequestBody Documentation d) { return repo.save(d); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public Documentation update(@PathVariable String id, @RequestBody Documentation d) { d.setId(id); return repo.save(d); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) { repo.deleteById(id); }
}
