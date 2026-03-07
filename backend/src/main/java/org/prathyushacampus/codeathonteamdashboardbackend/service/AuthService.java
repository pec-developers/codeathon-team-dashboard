package org.prathyushacampus.codeathonteamdashboardbackend.service;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.AuthResponse;
import org.prathyushacampus.codeathonteamdashboardbackend.repository.TeamDetailsRepository;
import org.prathyushacampus.codeathonteamdashboardbackend.security.JwtUtil;
import org.prathyushacampus.codeathonteamdashboardbackend.security.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtUtil jwtUtil;
    private final TeamDetailsRepository teamDetailsRepository;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    public AuthResponse login(String username, String password, Role role) {
        if (role == Role.ADMIN && (!adminUsername.equals(username) || !adminPassword.equals(password))) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }

        if (role == Role.PARTICIPANT) {
            if (!teamDetailsRepository.existsByTeamId(username)) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username");
            }
            if (!password.equals(teamDetailsRepository.findById(username).get().getPassword())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
            }
        }

        String token = jwtUtil.generateToken(username, role);
        return new AuthResponse(token, role);
    }
}
