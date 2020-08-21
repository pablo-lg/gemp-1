package ar.com.telecom.gemp.service;

import ar.com.telecom.gemp.domain.TipoObra;

import java.util.List;
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
     * @return the list of entities.
     */
    List<TipoObra> findAll();


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
