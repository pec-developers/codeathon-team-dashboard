package org.prathyushacampus.codeathonteamdashboardbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaderBoardResponse {
    private LeaderBoardTeamDto[] teams;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LeaderBoardTeamDto {
        private String teamName;
        private int score;
    }

}
