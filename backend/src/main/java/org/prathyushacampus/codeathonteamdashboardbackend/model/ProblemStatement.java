package org.prathyushacampus.codeathonteamdashboardbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "problem_statement_t")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProblemStatement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(unique = true)
    private String psId;
    @NotNull
    private String psTitle;
    @NotNull
    @Enumerated(EnumType.STRING)
    private Theme theme;
    private String psPdfLink;
}
