package com.skillmap.service;

import com.skillmap.exception.ApiException;
import com.skillmap.model.Phase;
import com.skillmap.model.Roadmap;
import com.skillmap.model.Topic;
import com.skillmap.repository.RoadmapRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoadmapService {
    private final RoadmapRepository repo;
    public RoadmapService(RoadmapRepository repo) { this.repo = repo; }

    public List<Roadmap> list(String category, String search) {
        List<Roadmap> all = category == null ? repo.findAll() : repo.findByCategory(category);
        if (search == null || search.isBlank()) return all;
        String q = search.toLowerCase();
        return all.stream().filter(r -> r.getTitle().toLowerCase().contains(q) ||
                (r.getDescription() != null && r.getDescription().toLowerCase().contains(q))).toList();
    }

    public Roadmap getBySlug(String slug) {
        Roadmap r = repo.findBySlug(slug).orElseThrow(() -> ApiException.notFound("Roadmap not found"));
        r.setViews(r.getViews() + 1);
        return repo.save(r);
    }

    public Roadmap getById(String id) {
        return repo.findById(id).orElseThrow(() -> ApiException.notFound("Roadmap not found"));
    }

    public Roadmap create(Roadmap r) {
        if (r.getSlug() == null || r.getSlug().isBlank())
            r.setSlug(r.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", ""));
        if (r.getStatus() == null) r.setStatus("Draft");
        return repo.save(r);
    }

    public Roadmap update(String id, Roadmap patch) {
        Roadmap r = getById(id);
        if (patch.getTitle() != null) r.setTitle(patch.getTitle());
        if (patch.getDescription() != null) r.setDescription(patch.getDescription());
        if (patch.getLevel() != null) r.setLevel(patch.getLevel());
        if (patch.getDuration() != null) r.setDuration(patch.getDuration());
        if (patch.getIcon() != null) r.setIcon(patch.getIcon());
        if (patch.getStatus() != null) r.setStatus(patch.getStatus());
        if (patch.getCategory() != null) r.setCategory(patch.getCategory());
        return repo.save(r);
    }

    public void delete(String id) { repo.deleteById(id); }

    public Roadmap reorderPhases(String id, List<String> orderedIds) {
        Roadmap r = getById(id);
        Map<String, Phase> byId = new HashMap<>();
        for (Phase p : r.getPhases()) byId.put(p.getId(), p);
        List<Phase> newList = new ArrayList<>();
        for (int i = 0; i < orderedIds.size(); i++) {
            Phase p = byId.get(orderedIds.get(i));
            if (p != null) { p.setOrder(i); newList.add(p); }
        }
        r.setPhases(newList);
        return repo.save(r);
    }

    public Roadmap reorderTopics(String id, String phaseId, List<String> orderedIds) {
        Roadmap r = getById(id);
        Phase phase = r.getPhases().stream().filter(p -> p.getId().equals(phaseId)).findFirst()
                .orElseThrow(() -> ApiException.notFound("Phase not found"));
        Map<String, Topic> byId = new HashMap<>();
        for (Topic t : phase.getTopics()) byId.put(t.getId(), t);
        List<Topic> newList = new ArrayList<>();
        for (int i = 0; i < orderedIds.size(); i++) {
            Topic t = byId.get(orderedIds.get(i));
            if (t != null) { t.setOrder(i); newList.add(t); }
        }
        phase.setTopics(newList);
        return repo.save(r);
    }

    public Roadmap addPhase(String id, Phase p) {
        Roadmap r = getById(id);
        p.setOrder(r.getPhases().size());
        r.getPhases().add(p);
        return repo.save(r);
    }

    public Roadmap addTopic(String id, String phaseId, Topic t) {
        Roadmap r = getById(id);
        Phase ph = r.getPhases().stream().filter(p -> p.getId().equals(phaseId)).findFirst()
                .orElseThrow(() -> ApiException.notFound("Phase not found"));
        t.setOrder(ph.getTopics().size());
        ph.getTopics().add(t);
        return repo.save(r);
    }
}
