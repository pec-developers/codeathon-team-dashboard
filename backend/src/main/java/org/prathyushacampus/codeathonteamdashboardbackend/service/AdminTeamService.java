package org.prathyushacampus.codeathonteamdashboardbackend.service;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.AllTeamDetailsResponse;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.RegisterTeamRequest;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.TeamDetailsDto;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.UpdateTeamVenueRequest;
import org.prathyushacampus.codeathonteamdashboardbackend.model.Member;
import org.prathyushacampus.codeathonteamdashboardbackend.model.ProblemStatement;
import org.prathyushacampus.codeathonteamdashboardbackend.model.TeamDetails;
import org.prathyushacampus.codeathonteamdashboardbackend.model.Theme;
import org.prathyushacampus.codeathonteamdashboardbackend.repository.ProblemStatementRepository;
import org.prathyushacampus.codeathonteamdashboardbackend.repository.TeamDetailsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminTeamService {

    private final TeamDetailsRepository teamDetailsRepository;
    private final ProblemStatementRepository problemStatementRepository;

    public void registerTeam(RegisterTeamRequest request) {
        if (teamDetailsRepository.findById(request.getTeamId()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Team with id " + request.getTeamId() + " already exists");
        }

        TeamDetails team = TeamDetails.builder()
                .teamId(request.getTeamId())
                .password(request.getPassword())
                .teamName(request.getTeamName())
                .members(request.getMembers())
                .theme(request.getTheme())
                .build();
        teamDetailsRepository.save(team);
    }

    public AllTeamDetailsResponse getAllTeams() {
        List<TeamDetails> teams = teamDetailsRepository.findAll();

        TeamDetailsDto[] teamDtos = teams.stream()
                .map(team -> TeamDetailsDto.builder()
                        .teamId(team.getTeamId())
                        .teamName(team.getTeamName())
                        .theme(team.getTheme().toString())
                        .psId(team.getProblemStatement() != null ? team.getProblemStatement().getPsId() : null)
                        .psTitle(team.getProblemStatement() != null ? team.getProblemStatement().getPsTitle() : null)
                        .buildingName(team.getBuildingName())
                        .floor(team.getFloor())
                        .tableNumber(team.getTableNumber())
                        .score(team.getScore())
                        .members(team.getMembers().toArray(new Member[0]))
                        .build())
                .toArray(TeamDetailsDto[]::new);

        return AllTeamDetailsResponse.builder()
                .teams(teamDtos)
                .build();
    }

    public void updateTeamVenue(String teamId, UpdateTeamVenueRequest request) {
        TeamDetails team = teamDetailsRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        if (request.getBuildingName() != null) {
            team.setBuildingName(request.getBuildingName());
        }
        if (request.getFloor() != null) {
            team.setFloor(request.getFloor());
        }
        if (request.getTableNumber() != null) {
            team.setTableNumber(request.getTableNumber());
        }

        teamDetailsRepository.save(team);
    }

    public void deleteTeam(String teamId) {
        if (!teamDetailsRepository.existsById(teamId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found");
        }
        teamDetailsRepository.deleteById(teamId);
    }

    public void resetPassword(String teamId, String newPassword) {
        TeamDetails team = teamDetailsRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        team.setPassword(newPassword);
        teamDetailsRepository.save(team);
    }

    public void updateTeamScore(String teamId, int score) {
        TeamDetails team = teamDetailsRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        team.setScore(score);
        teamDetailsRepository.save(team);
    }

    public void updateTeamTheme(String teamId, String theme) {
        TeamDetails team = teamDetailsRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        team.setTheme(Theme.valueOf(theme));
        teamDetailsRepository.save(team);
    }

    public void updateTeamMembers(String teamId, Member[] members) {
        TeamDetails team = teamDetailsRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        team.setMembers(new ArrayList<>(List.of(members)));

        teamDetailsRepository.save(team);
    }

    public void updateTeamProblemStatement(String teamId, String psId) {
        TeamDetails team = teamDetailsRepository.findById(teamId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));

        ProblemStatement problemStatement = problemStatementRepository.findByPsId(psId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Problem statement not found"));

        if (!team.getTheme().equals(problemStatement.getTheme())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Problem statement theme does not match team theme");
        }

        team.setProblemStatement(problemStatement);
        teamDetailsRepository.save(team);
    }
}
