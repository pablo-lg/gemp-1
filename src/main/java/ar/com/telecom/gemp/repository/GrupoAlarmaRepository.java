package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.GrupoAlarma;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GrupoAlarma entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrupoAlarmaRepository extends JpaRepository<GrupoAlarma, Long> {
}
