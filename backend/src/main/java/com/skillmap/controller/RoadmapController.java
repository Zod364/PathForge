package com.skillmap.controller;

import com.skillmap.dto.ReorderRequest;
import com.skillmap.model.Phase;
import com.skillmap.model.Roadmap;
import com.skillmap.model.Topic;
import com.skillmap.service.RoadmapService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roadmaps")
public class RoadmapController {
    private final RoadmapService svc;
    public RoadmapController(RoadmapService svc) { this.svc = svc; }

    @GetMapping
    public List<Roadmap> list(@RequestParam(required = false) String category,
                              @RequestParam(required = false) String search) {
        return svc.list(category, search);
    }

    @GetMapping("/{slug}")
    public Roadmap get(@PathVariable String slug) { return svc.getBySlug(slug); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public Roadmap create(@RequestBody Roadmap r) { return svc.create(r); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public Roadmap update(@PathVariable String id, @RequestBody Roadmap r) { return svc.update(id, r); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) { svc.delete(id); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PatchMapping("/{id}/phases/reorder")
    public Roadmap reorderPhases(@PathVariable String id, @RequestBody ReorderRequest req) {
        return svc.reorderPhases(id, req.orderedIds);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PatchMapping("/{id}/phases/{phaseId}/topics/reorder")
    public Roadmap reorderTopics(@PathVariable String id, @PathVariable String phaseId, @RequestBody ReorderRequest req) {
        return svc.reorderTopics(id, phaseId, req.orderedIds);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/{id}/phases")
    public Roadmap addPhase(@PathVariable String id, @RequestBody Phase p) { return svc.addPhase(id, p); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/{id}/phases/{phaseId}/topics")
    public Roadmap addTopic(@PathVariable String id, @PathVariable String phaseId, @RequestBody Topic t) {
        return svc.addTopic(id, phaseId, t);
    }
}
