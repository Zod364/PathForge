package com.skillmap.controller;

import com.skillmap.dto.AIRequest;
import com.skillmap.service.AIService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {
    private final AIService ai;
    public AIController(AIService ai) { this.ai = ai; }

    @PostMapping("/explain")
    public Map<String, Object> explain(@RequestBody AIRequest req) {
        return ai.explain(req.topic, req.level);
    }

    @PostMapping("/suggest")
    public Map<String, Object> suggest(@RequestBody AIRequest req) {
        return ai.suggest(req.goal, req.roadmapSlug);
    }

    @PostMapping("/evaluate")
    public Map<String, Object> evaluate(@RequestBody AIRequest req) {
        return ai.evaluate(req.userAnswer, req.rubric, null);
    }
}
