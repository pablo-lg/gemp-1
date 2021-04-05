package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.TipoDesp;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TipoDesp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoDespRepository extends JpaRepository<TipoDesp, Long> {}
