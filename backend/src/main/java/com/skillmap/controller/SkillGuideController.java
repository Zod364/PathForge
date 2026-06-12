package com.skillmap.controller;

import com.skillmap.model.SkillGuide;
import com.skillmap.repository.SkillGuideRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skill-guides")
public class SkillGuideController {
    private final SkillGuideRepository repo;
    public SkillGuideController(SkillGuideRepository r) { this.repo = r; }

    @GetMapping public List<SkillGuide> list() { return repo.findAll(); }
    @GetMapping("/{id}") public SkillGuide get(@PathVariable String id) { return repo.findById(id).orElseThrow(); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping public SkillGuide create(@RequestBody SkillGuide s) { return repo.save(s); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public SkillGuide update(@PathVariable String id, @RequestBody SkillGuide s) { s.setId(id); return repo.save(s); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) { repo.deleteById(id); }
}
