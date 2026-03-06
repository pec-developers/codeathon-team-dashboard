package org.prathyushacampus.codeathonteamdashboardbackend.controller.participant;

import org.prathyushacampus.codeathonteamdashboardbackend.dto.FinalizePsRequest;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.ParticipantTeamProfileRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/team")
public class ParticipantTeamController {

    private String getTeamId() {
        return (String) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
    }

    @GetMapping("/dashboard")
    @ResponseStatus(HttpStatus.OK)
    public String getDashboard() {
        return "Dashboard for team: " + getTeamId();
    }

    @PostMapping("/complete-profile")
    @ResponseStatus(HttpStatus.OK)
    public String completeProfile(@RequestBody ParticipantTeamProfileRequest request) {
        return "Team " + getTeamId() + " profile completed successfully: " + request.getTeamName() + " registered successfully";
    }

    @PostMapping("/finalize-ps")
    @ResponseStatus(HttpStatus.CREATED)
    public String finalizeProblemStatement(@RequestBody FinalizePsRequest request) {
        return "Problem statement for team " + getTeamId() + " with psId " + request.getPsId() + " finalized successfully";
    }
}
