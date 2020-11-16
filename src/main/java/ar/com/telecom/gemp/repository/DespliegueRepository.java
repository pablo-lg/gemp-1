package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.Despliegue;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Despliegue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DespliegueRepository extends JpaRepository<Despliegue, Long> {
}
