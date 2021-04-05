package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.Direccion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Direccion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DireccionRepository extends JpaRepository<Direccion, String> {}
