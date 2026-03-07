package org.prathyushacampus.codeathonteamdashboardbackend.controller;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.AuthRequest;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.AuthResponse;
import org.prathyushacampus.codeathonteamdashboardbackend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse login(@RequestBody AuthRequest request) {
        return authService.login(request.getUsername(), request.getPassword(), request.getRole());
    }

}
