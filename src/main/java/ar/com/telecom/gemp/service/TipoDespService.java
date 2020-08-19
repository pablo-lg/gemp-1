package ar.com.telecom.gemp.service;

import ar.com.telecom.gemp.domain.TipoDesp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
     * Get all the tipoDesps.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TipoDesp> findAll(Pageable pageable);


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
