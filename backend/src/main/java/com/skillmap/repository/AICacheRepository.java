package com.skillmap.repository;

import com.skillmap.model.AICache;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AICacheRepository extends MongoRepository<AICache, String> {
    Optional<AICache> findByKey(String key);
}
