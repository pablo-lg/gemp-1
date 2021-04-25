package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.Emprendimiento;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Emprendimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmprendimientoRepository extends JpaRepository<Emprendimiento, Long> {
    Optional<Emprendimiento> findByDireccionPaisAndDireccionProvinciaAndDireccionPartidoAndDireccionLocalidadAndDireccionCalleAndDireccionAltura(
        String pais,
        String provincia,
        String partido,
        String localidad,
        String calle,
        Long altura
    );
}
