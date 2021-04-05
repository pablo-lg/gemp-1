package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.Tecnologia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Tecnologia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TecnologiaRepository extends JpaRepository<Tecnologia, Long> {}
