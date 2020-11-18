package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.EjecCuentas;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EjecCuentas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EjecCuentasRepository extends JpaRepository<EjecCuentas, Long> {
}
