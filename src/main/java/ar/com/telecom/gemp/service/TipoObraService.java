package ar.com.telecom.gemp.service;

import ar.com.telecom.gemp.domain.TipoObra;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link TipoObra}.
 */
public interface TipoObraService {

    /**
     * Save a tipoObra.
     *
     * @param tipoObra the entity to save.
     * @return the persisted entity.
     */
    TipoObra save(TipoObra tipoObra);

    /**
     * Get all the tipoObras.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TipoObra> findAll(Pageable pageable);


    /**
     * Get the "id" tipoObra.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoObra> findOne(Long id);

    /**
     * Delete the "id" tipoObra.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
