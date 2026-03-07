package org.prathyushacampus.codeathonteamdashboardbackend.service;

import lombok.RequiredArgsConstructor;
import org.prathyushacampus.codeathonteamdashboardbackend.model.AppConfig;
import org.prathyushacampus.codeathonteamdashboardbackend.repository.AppConfigRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppConfigService {

    private final AppConfigRepository appConfigRepository;

    private static final String PS_RELEASED_KEY = "PS_RELEASED";

    public boolean isPsReleased() {
        return appConfigRepository.findById(PS_RELEASED_KEY)
                .map(config -> "true".equalsIgnoreCase(config.getConfigValue()))
                .orElse(false);
    }

    public void setPsReleased(boolean released) {
        AppConfig config = appConfigRepository.findById(PS_RELEASED_KEY)
                .orElse(AppConfig.builder().configKey(PS_RELEASED_KEY).build());
        config.setConfigValue(String.valueOf(released));
        appConfigRepository.save(config);
    }
}
