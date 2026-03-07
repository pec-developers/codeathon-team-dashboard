package org.prathyushacampus.codeathonteamdashboardbackend.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTeamVenueRequest {
    private String buildingName;
    private String floor;
    private String tableNumber;
}
