package org.prathyushacampus.codeathonteamdashboardbackend.repository;

import org.prathyushacampus.codeathonteamdashboardbackend.model.ProblemStatement;
import org.prathyushacampus.codeathonteamdashboardbackend.model.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProblemStatementRepository extends JpaRepository<ProblemStatement, String> {
    List<ProblemStatement> findByTheme(Theme theme);

    Optional<ProblemStatement> findByPsId(String psId);

    boolean existsByPsId(String problemStatementId);

    void deleteByPsId(String problemStatementId);
}
