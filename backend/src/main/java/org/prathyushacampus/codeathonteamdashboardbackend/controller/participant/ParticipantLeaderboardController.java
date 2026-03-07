package org.prathyushacampus.codeathonteamdashboardbackend.controller.participant;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.LeaderBoardResponse;
import org.prathyushacampus.codeathonteamdashboardbackend.service.ParticipantLeaderboardService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teams/leaderboard")
@RequiredArgsConstructor
public class ParticipantLeaderboardController {

    private final ParticipantLeaderboardService participantLeaderboardService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public LeaderBoardResponse getLeaderboard(@RequestParam(defaultValue = "10") int top) {
        return participantLeaderboardService.getLeaderboard(top);
    }

}
