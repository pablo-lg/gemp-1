package ar.com.telecom.gemp.service;

import ar.com.telecom.gemp.domain.TipoEmp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link TipoEmp}.
 */
public interface TipoEmpService {

    /**
     * Save a tipoEmp.
     *
     * @param tipoEmp the entity to save.
     * @return the persisted entity.
     */
    TipoEmp save(TipoEmp tipoEmp);

    /**
     * Get all the tipoEmps.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TipoEmp> findAll(Pageable pageable);


    /**
     * Get the "id" tipoEmp.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoEmp> findOne(Long id);

    /**
     * Delete the "id" tipoEmp.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
