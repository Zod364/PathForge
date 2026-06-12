package com.skillmap.dto;

import lombok.Data;

@Data
public class AIRequest {
    public String userId;
    public String roadmapSlug;
    public String topic;
    public String level;      // for explain
    public String userAnswer; // for evaluate
    public String rubric;
    public String goal;
}
