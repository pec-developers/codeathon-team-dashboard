package org.prathyushacampus.codeathonteamdashboardbackend.controller.admin;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.AllProblemStatementResponse;
import org.prathyushacampus.codeathonteamdashboardbackend.dto.ProblemStatementRequest;
import org.prathyushacampus.codeathonteamdashboardbackend.service.AdminProblemStatementService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/problem-statements")
@RequiredArgsConstructor
public class AdminProblemStatementController {

    private final AdminProblemStatementService adminProblemStatementService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public AllProblemStatementResponse getAllProblemStatements() {
        return adminProblemStatementService.getAllProblemStatements();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String createProblemStatement(@RequestBody ProblemStatementRequest request) {
        adminProblemStatementService.createProblemStatement(request);
        return "Problem statement " + request.getPsId() + " created successfully";
    }

    @PutMapping("/{problemStatementId}")
    @ResponseStatus(HttpStatus.OK)
    public String updateProblemStatement(@PathVariable String problemStatementId,
            @RequestBody ProblemStatementRequest request) {
        adminProblemStatementService.updateProblemStatement(problemStatementId, request);
        return "Problem statement " + problemStatementId + " updated successfully";
    }

    @DeleteMapping("/{problemStatementId}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteProblemStatement(@PathVariable String problemStatementId) {
        adminProblemStatementService.deleteProblemStatement(problemStatementId);
        return "Problem statement " + problemStatementId + " deleted successfully";
    }

    @PostMapping("/release")
    @ResponseStatus(HttpStatus.OK)
    public String releaseProblemStatements(@RequestParam("released") Boolean isReleased) {
        return adminProblemStatementService.releaseProblemStatements(isReleased);
    }
}
