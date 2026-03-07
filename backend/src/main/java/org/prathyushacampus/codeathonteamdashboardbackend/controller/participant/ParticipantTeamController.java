package org.prathyushacampus.codeathonteamdashboardbackend.controller.participant;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.FinalizePsRequest;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.TeamCompleteProfileRequest;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.TeamDashboardResponse;
import org.prathyushacampus.codeathonteamdashboardbackend.service.ParticipantTeamService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class ParticipantTeamController {

    private final ParticipantTeamService participantTeamService;

    private String getTeamId() {
        return (String) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
    }

    @GetMapping("/dashboard")
    @ResponseStatus(HttpStatus.OK)
    public TeamDashboardResponse getDashboard() {
        return participantTeamService.getDashboard(getTeamId());
    }

    @PostMapping("/complete-profile")
    @ResponseStatus(HttpStatus.OK)
    public String completeProfile(@RequestBody TeamCompleteProfileRequest request) {
        return participantTeamService.completeProfile(getTeamId(), request.getNewPassword());
    }

    @PostMapping("/finalize-ps")
    @ResponseStatus(HttpStatus.CREATED)
    public String finalizeProblemStatement(@RequestBody FinalizePsRequest request) {
        return participantTeamService.finalizeProblemStatement(getTeamId(), request.getPsId());
    }
}
