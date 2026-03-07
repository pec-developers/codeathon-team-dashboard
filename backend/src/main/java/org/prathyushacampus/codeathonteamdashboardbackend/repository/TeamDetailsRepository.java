package org.prathyushacampus.codeathonteamdashboardbackend.repository;

import org.prathyushacampus.codeathonteamdashboardbackend.model.TeamDetails;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamDetailsRepository extends JpaRepository<TeamDetails, String> {
    List<TeamDetails> findAllByOrderByScoreDesc(Pageable pageable);

    boolean existsByTeamId(String username);
}
