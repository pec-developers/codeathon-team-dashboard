package org.prathyushacampus.codeathonteamdashboardbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.model.Theme;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamDashboardResponse {
    String teamId;
    String teamName;
    Boolean isProfileCompleted;
    MemberDto[] members;

    Theme theme;
    Boolean psReleased;
    Boolean psFinalized;
    ProblemStatementDto[] problemStatements;

    String buildingName;
    String floor;
    String tableNumber;
}
