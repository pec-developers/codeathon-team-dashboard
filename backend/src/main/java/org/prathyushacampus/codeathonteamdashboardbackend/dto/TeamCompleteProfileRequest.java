package org.prathyushacampus.codeathonteamdashboardbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamCompleteProfileRequest {
    private String newPassword;
}
