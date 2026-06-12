package com.skillmap.model;

import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Phase {
    @Builder.Default private String id = UUID.randomUUID().toString();
    private String title;
    private String summary;
    private int order;
    @Builder.Default private List<Topic> topics = new ArrayList<>();
}
