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
public class UpdateTeamMembersRequest {
    private Member[] members;
}
