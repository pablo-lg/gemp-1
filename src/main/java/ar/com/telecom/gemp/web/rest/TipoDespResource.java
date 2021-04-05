package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.TipoDesp;
import ar.com.telecom.gemp.repository.TipoDespRepository;
import ar.com.telecom.gemp.service.TipoDespService;
import ar.com.telecom.gemp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link ar.com.telecom.gemp.domain.TipoDesp}.
 */
@RestController
@RequestMapping("/api")
public class TipoDespResource {

    private final Logger log = LoggerFactory.getLogger(TipoDespResource.class);

    private static final String ENTITY_NAME = "tipoDesp";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoDespService tipoDespService;

    private final TipoDespRepository tipoDespRepository;

    public TipoDespResource(TipoDespService tipoDespService, TipoDespRepository tipoDespRepository) {
        this.tipoDespService = tipoDespService;
        this.tipoDespRepository = tipoDespRepository;
    }

    /**
     * {@code POST  /tipo-desps} : Create a new tipoDesp.
     *
     * @param tipoDesp the tipoDesp to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoDesp, or with status {@code 400 (Bad Request)} if the tipoDesp has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-desps")
    public ResponseEntity<TipoDesp> createTipoDesp(@RequestBody TipoDesp tipoDesp) throws URISyntaxException {
        log.debug("REST request to save TipoDesp : {}", tipoDesp);
        if (tipoDesp.getId() != null) {
            throw new BadRequestAlertException("A new tipoDesp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoDesp result = tipoDespService.save(tipoDesp);
        return ResponseEntity
            .created(new URI("/api/tipo-desps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-desps/:id} : Updates an existing tipoDesp.
     *
     * @param id the id of the tipoDesp to save.
     * @param tipoDesp the tipoDesp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDesp,
     * or with status {@code 400 (Bad Request)} if the tipoDesp is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoDesp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-desps/{id}")
    public ResponseEntity<TipoDesp> updateTipoDesp(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoDesp tipoDesp
    ) throws URISyntaxException {
        log.debug("REST request to update TipoDesp : {}, {}", id, tipoDesp);
        if (tipoDesp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoDesp.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoDespRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoDesp result = tipoDespService.save(tipoDesp);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoDesp.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-desps/:id} : Partial updates given fields of an existing tipoDesp, field will ignore if it is null
     *
     * @param id the id of the tipoDesp to save.
     * @param tipoDesp the tipoDesp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDesp,
     * or with status {@code 400 (Bad Request)} if the tipoDesp is not valid,
     * or with status {@code 404 (Not Found)} if the tipoDesp is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoDesp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tipo-desps/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<TipoDesp> partialUpdateTipoDesp(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoDesp tipoDesp
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoDesp partially : {}, {}", id, tipoDesp);
        if (tipoDesp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoDesp.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoDespRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoDesp> result = tipoDespService.partialUpdate(tipoDesp);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoDesp.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-desps} : get all the tipoDesps.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoDesps in body.
     */
    @GetMapping("/tipo-desps")
    public List<TipoDesp> getAllTipoDesps() {
        log.debug("REST request to get all TipoDesps");
        return tipoDespService.findAll();
    }

    /**
     * {@code GET  /tipo-desps/:id} : get the "id" tipoDesp.
     *
     * @param id the id of the tipoDesp to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoDesp, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-desps/{id}")
    public ResponseEntity<TipoDesp> getTipoDesp(@PathVariable Long id) {
        log.debug("REST request to get TipoDesp : {}", id);
        Optional<TipoDesp> tipoDesp = tipoDespService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoDesp);
    }

    /**
     * {@code DELETE  /tipo-desps/:id} : delete the "id" tipoDesp.
     *
     * @param id the id of the tipoDesp to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-desps/{id}")
    public ResponseEntity<Void> deleteTipoDesp(@PathVariable Long id) {
        log.debug("REST request to delete TipoDesp : {}", id);
        tipoDespService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
