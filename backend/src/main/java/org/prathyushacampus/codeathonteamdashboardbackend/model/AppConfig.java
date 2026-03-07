package org.prathyushacampus.codeathonteamdashboardbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "app_config_t")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppConfig {
    @Id
    private String configKey;
    private String configValue;
}
