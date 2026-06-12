package com.skillmap.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Document("users")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id private String id;
    private String name;
    @Indexed(unique = true) private String email;
    private String password;       // bcrypt
    private String goal;           // e.g., "SDE", "Data Scientist"
    @Builder.Default private Set<String> roles = new HashSet<>(Set.of("ROLE_USER"));
    @Builder.Default private Instant createdAt = Instant.now();
    private Instant lastLoginAt;
}
