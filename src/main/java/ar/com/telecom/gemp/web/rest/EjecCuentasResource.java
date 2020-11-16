package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.EjecCuentas;
import ar.com.telecom.gemp.repository.EjecCuentasRepository;
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
 * REST controller for managing {@link ar.com.telecom.gemp.domain.EjecCuentas}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EjecCuentasResource {

    private final Logger log = LoggerFactory.getLogger(EjecCuentasResource.class);

    private static final String ENTITY_NAME = "ejecCuentas";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EjecCuentasRepository ejecCuentasRepository;

    public EjecCuentasResource(EjecCuentasRepository ejecCuentasRepository) {
        this.ejecCuentasRepository = ejecCuentasRepository;
    }

    /**
     * {@code POST  /ejec-cuentas} : Create a new ejecCuentas.
     *
     * @param ejecCuentas the ejecCuentas to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ejecCuentas, or with status {@code 400 (Bad Request)} if the ejecCuentas has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ejec-cuentas")
    public ResponseEntity<EjecCuentas> createEjecCuentas(@RequestBody EjecCuentas ejecCuentas) throws URISyntaxException {
        log.debug("REST request to save EjecCuentas : {}", ejecCuentas);
        if (ejecCuentas.getId() != null) {
            throw new BadRequestAlertException("A new ejecCuentas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EjecCuentas result = ejecCuentasRepository.save(ejecCuentas);
        return ResponseEntity.created(new URI("/api/ejec-cuentas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ejec-cuentas} : Updates an existing ejecCuentas.
     *
     * @param ejecCuentas the ejecCuentas to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ejecCuentas,
     * or with status {@code 400 (Bad Request)} if the ejecCuentas is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ejecCuentas couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ejec-cuentas")
    public ResponseEntity<EjecCuentas> updateEjecCuentas(@RequestBody EjecCuentas ejecCuentas) throws URISyntaxException {
        log.debug("REST request to update EjecCuentas : {}", ejecCuentas);
        if (ejecCuentas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EjecCuentas result = ejecCuentasRepository.save(ejecCuentas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ejecCuentas.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ejec-cuentas} : get all the ejecCuentas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ejecCuentas in body.
     */
    @GetMapping("/ejec-cuentas")
    public List<EjecCuentas> getAllEjecCuentas() {
        log.debug("REST request to get all EjecCuentas");
        return ejecCuentasRepository.findAll();
    }

    /**
     * {@code GET  /ejec-cuentas/:id} : get the "id" ejecCuentas.
     *
     * @param id the id of the ejecCuentas to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ejecCuentas, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ejec-cuentas/{id}")
    public ResponseEntity<EjecCuentas> getEjecCuentas(@PathVariable Long id) {
        log.debug("REST request to get EjecCuentas : {}", id);
        Optional<EjecCuentas> ejecCuentas = ejecCuentasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ejecCuentas);
    }

    /**
     * {@code DELETE  /ejec-cuentas/:id} : delete the "id" ejecCuentas.
     *
     * @param id the id of the ejecCuentas to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ejec-cuentas/{id}")
    public ResponseEntity<Void> deleteEjecCuentas(@PathVariable Long id) {
        log.debug("REST request to delete EjecCuentas : {}", id);
        ejecCuentasRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
