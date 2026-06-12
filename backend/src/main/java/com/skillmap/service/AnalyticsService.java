package com.skillmap.service;

import com.skillmap.model.*;
import com.skillmap.repository.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {
    private final UserRepository users;
    private final RoadmapRepository roadmaps;
    private final QuizRepository quizzes;
    private final ProgressRepository progress;

    public AnalyticsService(UserRepository u, RoadmapRepository r, QuizRepository q, ProgressRepository p) {
        this.users = u; this.roadmaps = r; this.quizzes = q; this.progress = p;
    }

    public Map<String, Object> overview() {
        long totalUsers = users.count();
        long totalRoadmaps = roadmaps.count();
        long totalQuizzes = quizzes.count();
        long activeWeek = users.findAll().stream()
                .filter(u -> u.getLastLoginAt() != null
                        && u.getLastLoginAt().isAfter(Instant.now().minus(7, ChronoUnit.DAYS)))
                .count();
        return Map.of(
                "users", totalUsers, "roadmaps", totalRoadmaps,
                "quizzes", totalQuizzes, "activeWeek", activeWeek
        );
    }

    public List<Map<String, Object>> userGrowth() {
        // group users by day of creation over last 14 days
        Map<String, Integer> byDay = new TreeMap<>();
        Instant since = Instant.now().minus(14, ChronoUnit.DAYS);
        for (User u : users.findAll()) {
            if (u.getCreatedAt() != null && u.getCreatedAt().isAfter(since)) {
                String d = u.getCreatedAt().toString().substring(0, 10);
                byDay.merge(d, 1, Integer::sum);
            }
        }
        List<Map<String, Object>> out = new ArrayList<>();
        int running = 0;
        for (var e : byDay.entrySet()) {
            running += e.getValue();
            out.add(Map.of("date", e.getKey(), "value", running));
        }
        if (out.isEmpty()) out.add(Map.of("date", Instant.now().toString().substring(0,10), "value", users.count()));
        return out;
    }

    public List<Map<String, Object>> popularRoadmaps() {
        return roadmaps.findAll().stream()
                .sorted(Comparator.comparingInt(Roadmap::getViews).reversed())
                .limit(6)
                .map(r -> (Map<String, Object>) new LinkedHashMap<String, Object>() {{
                    put("name", r.getTitle()); put("value", r.getViews());
                }})
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> completionRate() {
        List<Progress> all = progress.findAll();
        int done = 0, inProgress = 0, notStarted = 0;
        for (Progress p : all) {
            if (p.getPercent() >= 100) done++;
            else if (p.getPercent() > 0) inProgress++;
            else notStarted++;
        }
        if (done + inProgress + notStarted == 0) { notStarted = (int) users.count(); }
        return List.of(
                Map.of("name", "Completed", "value", done),
                Map.of("name", "In Progress", "value", inProgress),
                Map.of("name", "Not Started", "value", notStarted)
        );
    }
}
