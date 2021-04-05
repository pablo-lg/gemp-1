package ar.com.telecom.gemp.repository;

import ar.com.telecom.gemp.domain.GrupoUsuario;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the GrupoUsuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrupoUsuarioRepository extends JpaRepository<GrupoUsuario, Long> {}
