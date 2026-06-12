package com.skillmap.controller;

import com.skillmap.model.User;
import com.skillmap.repository.UserRepository;
import com.skillmap.service.AnalyticsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {
    private final UserRepository users;
    private final AnalyticsService analytics;

    public AdminController(UserRepository users, AnalyticsService analytics) {
        this.users = users; this.analytics = analytics;
    }

    @GetMapping("/users")
    public List<Map<String, Object>> listUsers() {
        return users.findAll().stream().map(u -> (Map<String, Object>) Map.of(
                "id", u.getId(), "name", u.getName(), "email", u.getEmail(),
                "goal", u.getGoal() == null ? "" : u.getGoal(),
                "roles", u.getRoles(),
                "createdAt", u.getCreatedAt(),
                "lastLoginAt", u.getLastLoginAt() == null ? "" : u.getLastLoginAt()
        )).toList();
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable String id) { users.deleteById(id); }

    @GetMapping("/analytics/overview")
    public Map<String, Object> overview() { return analytics.overview(); }

    @GetMapping("/analytics/user-growth")
    public List<Map<String, Object>> userGrowth() { return analytics.userGrowth(); }

    @GetMapping("/analytics/popular-roadmaps")
    public List<Map<String, Object>> popular() { return analytics.popularRoadmaps(); }

    @GetMapping("/analytics/completion-rate")
    public List<Map<String, Object>> completion() { return analytics.completionRate(); }
}
