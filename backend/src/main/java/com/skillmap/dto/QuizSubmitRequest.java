package com.skillmap.dto;

import lombok.Data;
import java.util.Map;

@Data
public class QuizSubmitRequest {
    public Map<String, Object> answers;  // { questionId: optionIndex | text }
}
