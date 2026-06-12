package com.skillmap.service;

import com.skillmap.dto.QuizSubmitRequest;
import com.skillmap.exception.ApiException;
import com.skillmap.model.Question;
import com.skillmap.model.Quiz;
import com.skillmap.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuizService {
    private final QuizRepository repo;
    public QuizService(QuizRepository repo) { this.repo = repo; }

    public List<Quiz> list(String track) {
        return track == null ? repo.findAll() : repo.findByTrack(track);
    }
    public Quiz get(String id) {
        return repo.findById(id).orElseThrow(() -> ApiException.notFound("Quiz not found"));
    }
    public Quiz save(Quiz q) { return repo.save(q); }
    public void delete(String id) { repo.deleteById(id); }

    public Map<String, Object> submit(String id, QuizSubmitRequest req) {
        Quiz q = get(id);
        int correct = 0, mcqTotal = 0;
        List<Map<String, Object>> review = new ArrayList<>();
        for (Question qs : q.getQuestions()) {
            Map<String, Object> item = new HashMap<>();
            item.put("questionId", qs.getId());
            item.put("stem", qs.getStem());
            item.put("type", qs.getType());
            Object given = req.answers == null ? null : req.answers.get(qs.getId());
            if ("MCQ".equals(qs.getType())) {
                mcqTotal++;
                boolean ok = given != null && Objects.equals(((Number) given).intValue(), qs.getCorrectIndex());
                if (ok) correct++;
                item.put("correct", ok);
                item.put("correctIndex", qs.getCorrectIndex());
                item.put("given", given);
            } else {
                item.put("given", given);
                item.put("modelAnswer", qs.getModelAnswer());
                item.put("rubric", qs.getRubric());
            }
            review.add(item);
        }
        return Map.of(
                "score", mcqTotal == 0 ? null : (int) Math.round(100.0 * correct / mcqTotal),
                "correct", correct, "mcqTotal", mcqTotal,
                "review", review
        );
    }

    public Quiz reorderQuestions(String id, List<String> orderedIds) {
        Quiz q = get(id);
        Map<String, Question> byId = new HashMap<>();
        for (Question qs : q.getQuestions()) byId.put(qs.getId(), qs);
        List<Question> newList = new ArrayList<>();
        for (int i = 0; i < orderedIds.size(); i++) {
            Question qs = byId.get(orderedIds.get(i));
            if (qs != null) { qs.setOrder(i); newList.add(qs); }
        }
        q.setQuestions(newList);
        return repo.save(q);
    }
}
