package org.prathyushacampus.codeathonteamdashboardbackend.service;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.LeaderBoardResponse;
import org.prathyushacampus.codeathonteamdashboardbackend.model.TeamDetails;
import org.prathyushacampus.codeathonteamdashboardbackend.repository.TeamDetailsRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParticipantLeaderboardService {

    private final TeamDetailsRepository teamDetailsRepository;

    public LeaderBoardResponse getLeaderboard(int top) {
        List<TeamDetails> teams = teamDetailsRepository.findAllByOrderByScoreDesc(PageRequest.of(0, top));

        LeaderBoardResponse.LeaderBoardTeamDto[] teamDtos = teams.stream()
                .map(team -> LeaderBoardResponse.LeaderBoardTeamDto.builder()
                        .teamName(team.getTeamName())
                        .score(team.getScore())
                        .build())
                .toArray(LeaderBoardResponse.LeaderBoardTeamDto[]::new);

        return LeaderBoardResponse.builder()
                .teams(teamDtos)
                .build();
    }
}
