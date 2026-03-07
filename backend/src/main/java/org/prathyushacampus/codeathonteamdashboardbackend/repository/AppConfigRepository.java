package org.prathyushacampus.codeathonteamdashboardbackend.repository;

import org.prathyushacampus.codeathonteamdashboardbackend.model.AppConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppConfigRepository extends JpaRepository<AppConfig, String> {
}
