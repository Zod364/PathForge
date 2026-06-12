package com.skillmap.controller;

import com.skillmap.dto.QuizSubmitRequest;
import com.skillmap.dto.ReorderRequest;
import com.skillmap.model.Quiz;
import com.skillmap.service.QuizService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
    private final QuizService svc;
    public QuizController(QuizService svc) { this.svc = svc; }

    @GetMapping
    public List<Quiz> list(@RequestParam(required = false) String track) { return svc.list(track); }

    @GetMapping("/{id}")
    public Quiz get(@PathVariable String id) { return svc.get(id); }

    @PostMapping("/{id}/submit")
    public Map<String, Object> submit(@PathVariable String id, @RequestBody QuizSubmitRequest r) {
        return svc.submit(id, r);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public Quiz create(@RequestBody Quiz q) { return svc.save(q); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public Quiz update(@PathVariable String id, @RequestBody Quiz q) { q.setId(id); return svc.save(q); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) { svc.delete(id); }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PatchMapping("/{id}/questions/reorder")
    public Quiz reorder(@PathVariable String id, @RequestBody ReorderRequest req) {
        return svc.reorderQuestions(id, req.orderedIds);
    }
}
