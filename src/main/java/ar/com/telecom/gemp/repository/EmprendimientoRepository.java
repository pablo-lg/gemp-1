package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.Emprendimiento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Emprendimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmprendimientoRepository extends JpaRepository<Emprendimiento, Long> {}
