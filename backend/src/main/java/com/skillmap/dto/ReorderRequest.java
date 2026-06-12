package com.skillmap.dto;

import lombok.Data;
import java.util.List;

@Data
public class ReorderRequest {
    public List<String> orderedIds;
}
