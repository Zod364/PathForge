package com.skillmap.repository;

import com.skillmap.model.SkillGuide;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SkillGuideRepository extends MongoRepository<SkillGuide, String> {
}
