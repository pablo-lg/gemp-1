package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.TipoEmp;
import ar.com.telecom.gemp.repository.TipoEmpRepository;
import ar.com.telecom.gemp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ar.com.telecom.gemp.domain.TipoEmp}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoEmpResource {

    private final Logger log = LoggerFactory.getLogger(TipoEmpResource.class);

    private static final String ENTITY_NAME = "tipoEmp";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoEmpRepository tipoEmpRepository;

    public TipoEmpResource(TipoEmpRepository tipoEmpRepository) {
        this.tipoEmpRepository = tipoEmpRepository;
    }

    /**
     * {@code POST  /tipo-emps} : Create a new tipoEmp.
     *
     * @param tipoEmp the tipoEmp to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoEmp, or with status {@code 400 (Bad Request)} if the tipoEmp has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-emps")
    public ResponseEntity<TipoEmp> createTipoEmp(@RequestBody TipoEmp tipoEmp) throws URISyntaxException {
        log.debug("REST request to save TipoEmp : {}", tipoEmp);
        if (tipoEmp.getId() != null) {
            throw new BadRequestAlertException("A new tipoEmp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoEmp result = tipoEmpRepository.save(tipoEmp);
        return ResponseEntity.created(new URI("/api/tipo-emps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-emps} : Updates an existing tipoEmp.
     *
     * @param tipoEmp the tipoEmp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoEmp,
     * or with status {@code 400 (Bad Request)} if the tipoEmp is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoEmp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-emps")
    public ResponseEntity<TipoEmp> updateTipoEmp(@RequestBody TipoEmp tipoEmp) throws URISyntaxException {
        log.debug("REST request to update TipoEmp : {}", tipoEmp);
        if (tipoEmp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoEmp result = tipoEmpRepository.save(tipoEmp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoEmp.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-emps} : get all the tipoEmps.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoEmps in body.
     */
    @GetMapping("/tipo-emps")
    public List<TipoEmp> getAllTipoEmps() {
        log.debug("REST request to get all TipoEmps");
        return tipoEmpRepository.findAll();
    }

    /**
     * {@code GET  /tipo-emps/:id} : get the "id" tipoEmp.
     *
     * @param id the id of the tipoEmp to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoEmp, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-emps/{id}")
    public ResponseEntity<TipoEmp> getTipoEmp(@PathVariable Long id) {
        log.debug("REST request to get TipoEmp : {}", id);
        Optional<TipoEmp> tipoEmp = tipoEmpRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoEmp);
    }

    /**
     * {@code DELETE  /tipo-emps/:id} : delete the "id" tipoEmp.
     *
     * @param id the id of the tipoEmp to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-emps/{id}")
    public ResponseEntity<Void> deleteTipoEmp(@PathVariable Long id) {
        log.debug("REST request to delete TipoEmp : {}", id);
        tipoEmpRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
