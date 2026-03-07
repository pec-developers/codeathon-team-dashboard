package org.prathyushacampus.codeathonteamdashboardbackend.service;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.MemberDto;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.ProblemStatementDto;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.TeamDashboardResponse;
import org.prathyushacampus.codeathonteamdashboardbackend.model.ProblemStatement;
import org.prathyushacampus.codeathonteamdashboardbackend.model.TeamDetails;
import org.prathyushacampus.codeathonteamdashboardbackend.repository.ProblemStatementRepository;
import org.prathyushacampus.codeathonteamdashboardbackend.repository.TeamDetailsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParticipantTeamService {

    private final TeamDetailsRepository teamDetailsRepository;
    private final ProblemStatementRepository problemStatementRepository;
    private final AppConfigService appConfigService;

    public TeamDashboardResponse getDashboard(String teamId) {
        TeamDetails team = teamDetailsRepository.findById(teamId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));

        boolean psReleased = appConfigService.isPsReleased();

        // Only load and send problem statements if admin has released them
        ProblemStatementDto[] psDtos = new ProblemStatementDto[0];

        if (psReleased && !team.getPsFinalized()) {
            List<ProblemStatement> problemStatements = problemStatementRepository.findByTheme(team.getTheme());
            psDtos = problemStatements.stream()
                    .map(ps -> ProblemStatementDto.builder()
                            .psId(ps.getPsId())
                            .psTitle(ps.getPsTitle())
                            .psPdfLink(ps.getPsPdfLink())
                            .build())
                    .toArray(ProblemStatementDto[]::new);
        }

        if(psReleased && team.getPsFinalized()) {
            ProblemStatement ps = team.getProblemStatement();
            psDtos = new ProblemStatementDto[]{
                    ProblemStatementDto.builder()
                            .psId(ps.getPsId())
                            .psTitle(ps.getPsTitle())
                            .psPdfLink(ps.getPsPdfLink())
                            .build()
            };
        }

        MemberDto[] memberDtos = team.getMembers() != null
                ? team.getMembers().stream()
                    .map(m -> MemberDto.builder()
                            .name(m.getName())
                            .emailId(m.getEmailId())
                            .build())
                    .toArray(MemberDto[]::new)
                : new MemberDto[0];

        return TeamDashboardResponse.builder()
                .teamId(team.getTeamId())
                .teamName(team.getTeamName())
                .isProfileCompleted(team.getIsProfileCompleted())
                .members(memberDtos)
                .theme(team.getTheme())
                .psReleased(psReleased)
                .psFinalized(team.getPsFinalized() != null && team.getPsFinalized())
                .problemStatements(psDtos)
                .buildingName(team.getBuildingName())
                .floor(team.getFloor())
                .tableNumber(team.getTableNumber())
                .build();
    }

    public String completeProfile(String teamId, String newPassword) {
        TeamDetails team = teamDetailsRepository.findById(teamId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));

        if(team.getIsProfileCompleted()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Team profile already completed");
        }

        team.setPassword(newPassword);
        team.setIsProfileCompleted(true);
        teamDetailsRepository.save(team);

        return "Team " + teamId + " profile completed successfully";
    }

    public String finalizeProblemStatement(String teamId, String psId) {
        // Ensure PS has been released before allowing finalization
        if (!appConfigService.isPsReleased()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Problem statements have not been released yet");
        }

        TeamDetails team = teamDetailsRepository.findById(teamId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));

        if (team.getPsFinalized() != null && team.getPsFinalized()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Problem statement already finalized for this team");
        }

        ProblemStatement ps = problemStatementRepository.findByPsId(psId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Problem statement not found"));

        // Validate that the PS's theme matches the team's theme
        if (team.getTheme() != ps.getTheme()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Problem statement theme (" + ps.getTheme() + ") does not match team theme (" + team.getTheme() + ")");
        }

        team.setProblemStatement(ps);
        team.setPsFinalized(true);
        teamDetailsRepository.save(team);

        return "Problem statement " + psId + " finalized successfully for team " + teamId;
    }

}
