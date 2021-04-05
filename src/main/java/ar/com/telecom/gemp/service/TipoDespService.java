package ar.com.telecom.gemp.service;

import ar.com.telecom.gemp.domain.TipoDesp;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link TipoDesp}.
 */
public interface TipoDespService {
    /**
     * Save a tipoDesp.
     *
     * @param tipoDesp the entity to save.
     * @return the persisted entity.
     */
    TipoDesp save(TipoDesp tipoDesp);

    /**
     * Partially updates a tipoDesp.
     *
     * @param tipoDesp the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TipoDesp> partialUpdate(TipoDesp tipoDesp);

    /**
     * Get all the tipoDesps.
     *
     * @return the list of entities.
     */
    List<TipoDesp> findAll();

    /**
     * Get the "id" tipoDesp.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoDesp> findOne(Long id);

    /**
     * Delete the "id" tipoDesp.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
