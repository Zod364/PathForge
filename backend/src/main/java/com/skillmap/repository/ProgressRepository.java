package com.skillmap.repository;

import com.skillmap.model.Progress;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProgressRepository extends MongoRepository<Progress, String> {
    Optional<Progress> findByUserIdAndRoadmapId(String userId, String roadmapId);
    List<Progress> findByUserId(String userId);
}
