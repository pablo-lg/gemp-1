package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.MasterTipoEmp;
import ar.com.telecom.gemp.repository.MasterTipoEmpRepository;
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
 * REST controller for managing {@link ar.com.telecom.gemp.domain.MasterTipoEmp}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MasterTipoEmpResource {

    private final Logger log = LoggerFactory.getLogger(MasterTipoEmpResource.class);

    private static final String ENTITY_NAME = "masterTipoEmp";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MasterTipoEmpRepository masterTipoEmpRepository;

    public MasterTipoEmpResource(MasterTipoEmpRepository masterTipoEmpRepository) {
        this.masterTipoEmpRepository = masterTipoEmpRepository;
    }

    /**
     * {@code POST  /master-tipo-emps} : Create a new masterTipoEmp.
     *
     * @param masterTipoEmp the masterTipoEmp to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new masterTipoEmp, or with status {@code 400 (Bad Request)} if the masterTipoEmp has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/master-tipo-emps")
    public ResponseEntity<MasterTipoEmp> createMasterTipoEmp(@RequestBody MasterTipoEmp masterTipoEmp) throws URISyntaxException {
        log.debug("REST request to save MasterTipoEmp : {}", masterTipoEmp);
        if (masterTipoEmp.getId() != null) {
            throw new BadRequestAlertException("A new masterTipoEmp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MasterTipoEmp result = masterTipoEmpRepository.save(masterTipoEmp);
        return ResponseEntity.created(new URI("/api/master-tipo-emps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /master-tipo-emps} : Updates an existing masterTipoEmp.
     *
     * @param masterTipoEmp the masterTipoEmp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated masterTipoEmp,
     * or with status {@code 400 (Bad Request)} if the masterTipoEmp is not valid,
     * or with status {@code 500 (Internal Server Error)} if the masterTipoEmp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/master-tipo-emps")
    public ResponseEntity<MasterTipoEmp> updateMasterTipoEmp(@RequestBody MasterTipoEmp masterTipoEmp) throws URISyntaxException {
        log.debug("REST request to update MasterTipoEmp : {}", masterTipoEmp);
        if (masterTipoEmp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MasterTipoEmp result = masterTipoEmpRepository.save(masterTipoEmp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, masterTipoEmp.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /master-tipo-emps} : get all the masterTipoEmps.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of masterTipoEmps in body.
     */
    @GetMapping("/master-tipo-emps")
    public List<MasterTipoEmp> getAllMasterTipoEmps() {
        log.debug("REST request to get all MasterTipoEmps");
        return masterTipoEmpRepository.findAll();
    }

    /**
     * {@code GET  /master-tipo-emps/:id} : get the "id" masterTipoEmp.
     *
     * @param id the id of the masterTipoEmp to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the masterTipoEmp, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/master-tipo-emps/{id}")
    public ResponseEntity<MasterTipoEmp> getMasterTipoEmp(@PathVariable Long id) {
        log.debug("REST request to get MasterTipoEmp : {}", id);
        Optional<MasterTipoEmp> masterTipoEmp = masterTipoEmpRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(masterTipoEmp);
    }

    /**
     * {@code DELETE  /master-tipo-emps/:id} : delete the "id" masterTipoEmp.
     *
     * @param id the id of the masterTipoEmp to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/master-tipo-emps/{id}")
    public ResponseEntity<Void> deleteMasterTipoEmp(@PathVariable Long id) {
        log.debug("REST request to delete MasterTipoEmp : {}", id);
        masterTipoEmpRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
