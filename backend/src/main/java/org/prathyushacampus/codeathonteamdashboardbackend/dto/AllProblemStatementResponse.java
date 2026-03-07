package org.prathyushacampus.codeathonteamdashboardbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AllProblemStatementResponse {
    private ProblemStatementDto[] problemStatements;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProblemStatementDto {
        private String psId;
        private String psTitle;
        private String theme;
        private String psPdfLink;
    }
}
