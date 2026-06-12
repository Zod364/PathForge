package com.skillmap.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document("progress")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Progress {
    @Id private String id;
    private String userId;
    private String roadmapId;
    @Builder.Default private List<String> completedTopics = new ArrayList<>();
    @Builder.Default private List<String> queuedTopics = new ArrayList<>();
    @Builder.Default private int percent = 0;
    @Builder.Default private Instant updatedAt = Instant.now();
}
