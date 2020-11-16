package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.Obra;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Obra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ObraRepository extends JpaRepository<Obra, Long> {
}
