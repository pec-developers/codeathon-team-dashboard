package org.prathyushacampus.codeathonteamdashboardbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.model.Member;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamDetailsDto {
    private String teamId;
    private String teamName;
    private String theme;
    private String psId;
    private String psTitle;
    private String buildingName;
    private String floor;
    private String tableNumber;
    private int score;
    private Member[] members;
}
