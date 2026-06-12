package com.skillmap.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("documentation")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Documentation {
    @Id private String id;
    private String tech;
    private String title;
    private String url;
    private String kind;   // "Official" | "Community" | "Tutorial"
    private String notes;
}
