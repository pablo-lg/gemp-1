package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.Direccion;
import java.util.Optional;


import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Direccion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DireccionRepository extends JpaRepository<Direccion, Long> {
    Optional<Direccion> findByPaisAndProvinciaAndPartidoAndLocalidadAndCalleAndAltura(String pais, String provincia, String partido, String localidad, String calle, Long altura);

}
