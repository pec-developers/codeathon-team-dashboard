package org.prathyushacampus.codeathonteamdashboardbackend.controller.admin;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.*;
import org.prathyushacampus.codeathonteamdashboardbackend.service.AdminTeamService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/teams")
@RequiredArgsConstructor
public class AdminTeamController {

    private final AdminTeamService adminTeamService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String registerTeam(@RequestBody RegisterTeamRequest request) {
        adminTeamService.registerTeam(request);
        return "Team " + request.getTeamId() + " registered successfully";
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public AllTeamDetailsResponse getAllTeams() {
        return adminTeamService.getAllTeams();
    }

    @DeleteMapping("/{teamId}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteTeam(@PathVariable String teamId) {
        adminTeamService.deleteTeam(teamId);
        return "Team " + teamId + " deleted successfully";
    }

    @PutMapping("/{teamId}/venue")
    @ResponseStatus(HttpStatus.OK)
    public String updateTeamVenue(@PathVariable String teamId, @RequestBody UpdateTeamVenueRequest request) {
        adminTeamService.updateTeamVenue(teamId, request);
        return "Team " + teamId + " venue updated successfully";
    }

    @PutMapping("/{teamId}/score")
    @ResponseStatus(HttpStatus.OK)
    public String updateTeamScore(@PathVariable String teamId, @RequestBody UpdateTeamScoreRequest request) {
        adminTeamService.updateTeamScore(teamId, request.getScore());
        return "Team " + teamId + " score updated successfully";
    }

    @PutMapping("/{teamId}/members")
    @ResponseStatus(HttpStatus.OK)
    public String updateTeamMembers(@PathVariable String teamId, @RequestBody UpdateTeamMembersRequest request) {
        adminTeamService.updateTeamMembers(teamId, request.getMembers());
        return "Team " + teamId + " members updated successfully";
    }

    @PutMapping("/{teamId}/theme")
    @ResponseStatus(HttpStatus.OK)
    public String updateTeamTheme(@PathVariable String teamId, @RequestBody UpdateTeamThemeRequest request) {
        adminTeamService.updateTeamTheme(teamId, request.getTheme());
        return "Team " + teamId + " theme updated successfully";
    }


    @PutMapping("/{teamId}/reset-passwd")
    @ResponseStatus(HttpStatus.OK)
    public String resetPassword(@PathVariable String teamId, @RequestBody ResetPasswordRequest request) {
        adminTeamService.resetPassword(teamId, request.getNewPassword());
        return "Password for team " + teamId + " reset successfully";
    }

}
