package org.prathyushacampus.codeathonteamdashboardbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProblemStatementRequest {
    public String psId;
    public String theme;
    public String title;
    public String pdfUrl;
}
