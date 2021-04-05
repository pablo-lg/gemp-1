package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.Estado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Estado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoRepository extends JpaRepository<Estado, Long> {}
