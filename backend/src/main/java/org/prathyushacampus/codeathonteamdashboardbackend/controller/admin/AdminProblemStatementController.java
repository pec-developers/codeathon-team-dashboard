package org.prathyushacampus.codeathonteamdashboardbackend.controller.admin;

import org.prathyushacampus.codeathonteamdashboardbackend.dto.ProblemStatementRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/problem-statements")
public class AdminProblemStatementController {

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
//   psId, theme, title, pdfUrl -> out
    public String getAllProblemStatements() {
        return "List of all problem statements";
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String createProblemStatement(@RequestBody ProblemStatementRequest request) {
        System.out.println(request.toString());
        return "Problem statement created successfully";
    }

    @PutMapping("/{problemStatementId}")
    @ResponseStatus(HttpStatus.OK)
    public String updateProblemStatement(@PathVariable String problemStatementId, @RequestBody ProblemStatementRequest request) {
//        check before changing the psId
        System.out.println(request.toString());
        return "Problem statement " + problemStatementId + " updated successfully";
    }

    @DeleteMapping("/{problemStatementId}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteProblemStatement(@PathVariable String problemStatementId) {
        return "Problem statement " + problemStatementId + " deleted successfully";
    }

}
