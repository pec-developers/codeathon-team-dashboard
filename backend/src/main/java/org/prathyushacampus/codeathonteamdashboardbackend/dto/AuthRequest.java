package org.prathyushacampus.codeathonteamdashboardbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.security.Role;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    public String username;
    public String password;
    public Role role;
}
