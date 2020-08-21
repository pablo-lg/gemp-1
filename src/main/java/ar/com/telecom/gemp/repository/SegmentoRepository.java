package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.Segmento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Segmento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SegmentoRepository extends JpaRepository<Segmento, Long> {
}
