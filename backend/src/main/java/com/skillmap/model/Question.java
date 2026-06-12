package com.skillmap.model;

import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Question {
    @Builder.Default private String id = UUID.randomUUID().toString();
    private String type;            // "MCQ" | "SHORT_ANSWER"
    private String stem;
    @Builder.Default private List<String> options = new ArrayList<>();
    private Integer correctIndex;   // for MCQ
    private String modelAnswer;     // for SHORT_ANSWER
    @Builder.Default private List<String> rubric = new ArrayList<>();
    private String difficulty;
    private int order;
}
