package com.skillmap.repository;

import com.skillmap.model.Documentation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DocumentationRepository extends MongoRepository<Documentation, String> {
    List<Documentation> findByTech(String tech);
}
