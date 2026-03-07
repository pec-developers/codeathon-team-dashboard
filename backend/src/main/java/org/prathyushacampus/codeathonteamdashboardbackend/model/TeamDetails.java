package org.prathyushacampus.codeathonteamdashboardbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "teams_details_t")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamDetails {
    @Id
    @NotNull
    private String teamId;
    @NotNull
    private String password;
    @NotNull
    private String teamName;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "team_id")
    private List<Member> members;

    @Builder.Default
    private Boolean isProfileCompleted = false;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Theme theme;
    @ManyToOne
    @JoinColumn(name = "ps_id")
    private ProblemStatement problemStatement;
    @Builder.Default
    private Boolean psFinalized = false;
    @Builder.Default
    private int score = 0;

    @Builder.Default
    private String buildingName = "Mega Lab";
    @Builder.Default
    private String floor = "First Floor";
    private String tableNumber;
}
