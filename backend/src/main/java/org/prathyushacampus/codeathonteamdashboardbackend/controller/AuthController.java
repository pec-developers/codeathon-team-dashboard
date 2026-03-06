package org.prathyushacampus.codeathonteamdashboardbackend.controller;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.security.JwtUtil;
import org.prathyushacampus.codeathonteamdashboardbackend.security.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    public record AuthRequest(String username, String password, Role role) {}
    public record AuthResponse(String token, Role role) {}

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse login(@RequestBody AuthRequest request) {
        if (request.role() == Role.ADMIN && (!adminUsername.equals(request.username()) || !adminPassword.equals(request.password()))) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }

        String token = jwtUtil.generateToken(request.username(), request.role());
        return new AuthResponse(token, request.role());
    }

}
