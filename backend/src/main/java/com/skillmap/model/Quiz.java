package com.skillmap.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document("quizzes")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Quiz {
    @Id private String id;
    private String title;
    private String description;
    private String track;      // "FullStack" | "DataAI" | "DevOps" | "Security"
    private String roadmapId;  // optional link
    private String difficulty; // "Easy" | "Medium" | "Hard"
    @Builder.Default private List<Question> questions = new ArrayList<>();
}
