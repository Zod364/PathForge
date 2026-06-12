package com.skillmap.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("resources")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Resource {
    @Id private String id;
    private String title;
    private String url;
    private String type;     // "Video" | "Article" | "Doc" | "Course"
    private String level;    // "Beginner" | "Intermediate" | "Advanced"
    private String tech;     // e.g., "Java"
    private String roadmapId;
}
