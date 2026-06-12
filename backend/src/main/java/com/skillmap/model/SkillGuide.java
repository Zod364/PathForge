package com.skillmap.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document("skill_guides")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class SkillGuide {
    @Id private String id;
    private String title;
    private String track;       // "Builder" | "Oracle" | "Sentinel"
    private String summary;
    private String timeline;    // e.g., "9–12 Months"
    @Builder.Default private List<Phase> phases = new ArrayList<>();
    private String goal;
}
