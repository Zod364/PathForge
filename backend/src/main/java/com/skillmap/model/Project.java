package com.skillmap.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document("projects")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Project {
    @Id private String id;
    private String title;
    private String description;
    private String level;         // "Beginner" | "Intermediate" | "Advanced" | "Specialized"
    @Builder.Default private List<String> stack = new ArrayList<>();
    @Builder.Default private List<String> milestones = new ArrayList<>();
    private String repoUrl;       // optional starter repo
    private String track;
}
