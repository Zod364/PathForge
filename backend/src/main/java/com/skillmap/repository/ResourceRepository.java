package com.skillmap.repository;

import com.skillmap.model.Resource;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ResourceRepository extends MongoRepository<Resource, String> {
    List<Resource> findByRoadmapId(String roadmapId);
    List<Resource> findByTech(String tech);
}
