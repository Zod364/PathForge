package com.skillmap.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document("roadmaps")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Roadmap {
    @Id private String id;
    @Indexed(unique = true) private String slug;
    private String title;
    private String description;
    private String category;    // "role" | "skill"
    private String level;       // "Easy" | "Medium" | "Hard"
    private String duration;    // e.g., "8 weeks"
    private String icon;        // lucide icon name
    private String status;      // "Draft" | "Published" | "Archived"
    @Builder.Default private List<Phase> phases = new ArrayList<>();
    @Builder.Default private int views = 0;
    @Builder.Default private int enrollments = 0;
    @Builder.Default private Instant createdAt = Instant.now();
}
