package com.skillmap.service;

import com.skillmap.model.AICache;
import com.skillmap.repository.AICacheRepository;
import com.skillmap.repository.RoadmapRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.util.*;

@Service
public class AIService {
    @Value("${app.ai.provider}") private String provider;
    @Value("${app.ai.api-key}") private String apiKey;
    @Value("${app.ai.model}") private String model;

    private final AICacheRepository cache;
    private final RoadmapRepository roadmaps;

    public AIService(AICacheRepository cache, RoadmapRepository roadmaps) {
        this.cache = cache; this.roadmaps = roadmaps;
    }

    public Map<String, Object> explain(String topic, String level) {
        String key = hash("explain:" + topic + ":" + level);
        var hit = cache.findByKey(key);
        if (hit.isPresent()) return parse(hit.get().getPayload());
        Map<String, Object> out;
        if (isAIEnabled()) {
            out = callProviderExplain(topic, level);
        } else {
            out = stubExplain(topic, level);
        }
        cache.save(AICache.builder().key(key).payload(stringify(out)).build());
        return out;
    }

    public Map<String, Object> suggest(String goal, String currentSlug) {
        String key = hash("suggest:" + goal + ":" + currentSlug);
        var hit = cache.findByKey(key);
        if (hit.isPresent()) return parse(hit.get().getPayload());
        List<Map<String, Object>> picks = new ArrayList<>();
        var all = roadmaps.findAll();
        all.sort((a, b) -> Integer.compare(b.getViews(), a.getViews()));
        for (var r : all.stream().limit(6).toList()) {
            if (currentSlug != null && currentSlug.equals(r.getSlug())) continue;
            picks.add(Map.of("slug", r.getSlug(), "title", r.getTitle(),
                    "reason", "Popular next step toward " + (goal == null ? "your goals" : goal),
                    "confidence", 0.8));
            if (picks.size() >= 4) break;
        }
        Map<String, Object> out = Map.of("suggestions", picks);
        cache.save(AICache.builder().key(key).payload(stringify(out)).build());
        return out;
    }

    public Map<String, Object> evaluate(String userAnswer, String rubric, String modelAnswer) {
        if (!isAIEnabled()) {
            int len = userAnswer == null ? 0 : userAnswer.trim().length();
            int score = Math.min(10, len / 40);
            return Map.of("score", score, "feedback",
                    "Stub evaluator: compare your answer with the model answer and rubric. Length-based score: " + score + "/10");
        }
        // Placeholder — real provider call would go here
        return Map.of("score", 7, "feedback", "Good coverage. Add a concrete example and mention edge cases.");
    }

    private boolean isAIEnabled() {
        return !"none".equalsIgnoreCase(provider) && apiKey != null && !apiKey.isBlank();
    }

    // ---- stubs (deterministic, provider-less) ----
    private Map<String, Object> stubExplain(String topic, String level) {
        return Map.of(
                "topic", topic,
                "summary", "A concise definition of " + topic + " at a " + (level == null ? "beginner" : level) + " level.",
                "whyItMatters", "Understanding " + topic + " helps you build, debug, and reason about real systems.",
                "analogy", "Think of " + topic + " like a well-labeled toolbox — the right tool for the right job.",
                "codeSample", "// example related to " + topic + "\n// replace with language-specific snippet",
                "gotchas", List.of("Common misconception #1", "Edge case to watch for", "Performance consideration"),
                "readMore", List.of("Official docs", "MDN / language reference", "A hands-on tutorial")
        );
    }

    private Map<String, Object> callProviderExplain(String topic, String level) {
        // Real implementation stub; keeps compilation simple. Wire your provider here.
        return stubExplain(topic, level);
    }

    private String hash(String s) {
        try {
            var md = MessageDigest.getInstance("SHA-256");
            var b = md.digest(s.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte x : b) sb.append(String.format("%02x", x));
            return sb.toString();
        } catch (Exception e) { return Integer.toHexString(s.hashCode()); }
    }

    private String stringify(Map<String, Object> m) {
        try { return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(m); }
        catch (Exception e) { return "{}"; }
    }
    @SuppressWarnings("unchecked")
    private Map<String, Object> parse(String s) {
        try { return new com.fasterxml.jackson.databind.ObjectMapper().readValue(s, Map.class); }
        catch (Exception e) { return Map.of(); }
    }
}
