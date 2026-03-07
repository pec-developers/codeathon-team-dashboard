package org.prathyushacampus.codeathonteamdashboardbackend.service;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.AllProblemStatementResponse;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.ProblemStatementRequest;
import org.prathyushacampus.codeathonteamdashboardbackend.model.ProblemStatement;
import org.prathyushacampus.codeathonteamdashboardbackend.model.Theme;
import org.prathyushacampus.codeathonteamdashboardbackend.repository.ProblemStatementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminProblemStatementService {

    private final AppConfigService appConfigService;
    private final ProblemStatementRepository problemStatementRepository;

    public String releaseProblemStatements(Boolean isReleased) {
        appConfigService.setPsReleased(isReleased);
        return isReleased ? "Problem statements released to participants" : "Problem statements hidden from participants";
    }

    public AllProblemStatementResponse getAllProblemStatements() {
        List<ProblemStatement> problemStatements = problemStatementRepository.findAll();

        AllProblemStatementResponse.ProblemStatementDto[] problemStatementDtos = problemStatements.stream()
                .map(ps -> AllProblemStatementResponse.ProblemStatementDto.builder()
                        .psId(ps.getPsId())
                        .psTitle(ps.getPsTitle())
                        .psPdfLink(ps.getPsPdfLink())
                        .theme(ps.getTheme().toString())
                        .build())
                .toArray(AllProblemStatementResponse.ProblemStatementDto[]::new);

        return AllProblemStatementResponse.builder()
                .problemStatements(problemStatementDtos)
                .build();
    }

    public void createProblemStatement(ProblemStatementRequest request) {
        if(problemStatementRepository.findByPsId(request.getPsId()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Problem statement with id " + request.getPsId() + " already exists");
        }

        ProblemStatement problemStatement = ProblemStatement.builder()
                .psId(request.getPsId())
                .psTitle(request.getTitle())
                .psPdfLink(request.getPdfUrl())
                .theme(Theme.valueOf(request.getTheme()))
                .build();

        problemStatementRepository.save(problemStatement);
    }

    public void updateProblemStatement(String problemStatementId, ProblemStatementRequest request) {
        ProblemStatement problemStatement = problemStatementRepository.findByPsId(problemStatementId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Problem statement not found"));

        if (request.getPsId() != null) {
            if(problemStatementRepository.findByPsId(request.getPsId()).isPresent()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Problem statement with id " + request.getPsId() + " already exists");
            }
            problemStatement.setPsId(request.getPsId());
        }
        if (request.getTitle() != null) {
            problemStatement.setPsTitle(request.getTitle());
        }
        if (request.getPdfUrl() != null) {
            problemStatement.setPsPdfLink(request.getPdfUrl());
        }
        if (request.getTheme() != null) {
            problemStatement.setTheme(Theme.valueOf(request.getTheme()));
        }

        problemStatementRepository.save(problemStatement);
    }

    @Transactional
    public void deleteProblemStatement(String problemStatementId) {
        if (!problemStatementRepository.existsByPsId(problemStatementId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Problem statement not found");
        }

        problemStatementRepository.deleteByPsId(problemStatementId);
    }
}
