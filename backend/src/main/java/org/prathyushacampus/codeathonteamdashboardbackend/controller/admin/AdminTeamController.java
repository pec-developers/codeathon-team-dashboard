package org.prathyushacampus.codeathonteamdashboardbackend.controller.admin;

import org.prathyushacampus.codeathonteamdashboardbackend.dto.RegisterTeamRequest;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.ResetPasswordRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/teams")
public class AdminTeamController {

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String register(@RequestBody RegisterTeamRequest request) {
        return "Team " + request.getTeamId() + " registered successfully";
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
//   teamId, teamName, leaderName, members, psId, psTitle
    public String getAllTeams() {
        return "List of all teams with teamId";
    }

    @DeleteMapping("/{teamId}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteTeam(@PathVariable String teamId) {
        return "Team " + teamId + " deleted successfully";
    }

    @PutMapping("/{teamId}/reset-passwd")
    @ResponseStatus(HttpStatus.OK)
    public String resetPassword(@PathVariable String teamId, @RequestBody ResetPasswordRequest request) {
        return "Password reset successfully for team " + teamId + " with new password " + request.getNewPassword();
    }

}
