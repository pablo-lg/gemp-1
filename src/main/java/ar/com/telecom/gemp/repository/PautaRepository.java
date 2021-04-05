package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.Pauta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Pauta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PautaRepository extends JpaRepository<Pauta, Long> {}
