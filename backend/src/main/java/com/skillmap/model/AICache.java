package com.skillmap.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("ai_cache")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class AICache {
    @Id private String id;
    @Indexed(unique = true) private String key;  // hash of input
    private String payload;                      // JSON response
    @Builder.Default private Instant createdAt = Instant.now();
}
