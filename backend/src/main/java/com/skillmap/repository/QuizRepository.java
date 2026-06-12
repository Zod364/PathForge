package com.skillmap.repository;

import com.skillmap.model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuizRepository extends MongoRepository<Quiz, String> {
    List<Quiz> findByTrack(String track);
    List<Quiz> findByRoadmapId(String roadmapId);
}
