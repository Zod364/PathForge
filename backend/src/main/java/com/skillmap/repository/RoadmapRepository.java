package com.skillmap.repository;

import com.skillmap.model.Roadmap;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RoadmapRepository extends MongoRepository<Roadmap, String> {
    Optional<Roadmap> findBySlug(String slug);
    List<Roadmap> findByCategory(String category);
    List<Roadmap> findByStatus(String status);
}
