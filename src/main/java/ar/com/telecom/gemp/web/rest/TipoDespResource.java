package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.TipoDesp;
import ar.com.telecom.gemp.service.TipoDespService;
import ar.com.telecom.gemp.web.rest.errors.BadRequestAlertException;
import ar.com.telecom.gemp.service.dto.TipoDespCriteria;
import ar.com.telecom.gemp.service.TipoDespQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

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

    private final TipoDespQueryService tipoDespQueryService;

    public TipoDespResource(TipoDespService tipoDespService, TipoDespQueryService tipoDespQueryService) {
        this.tipoDespService = tipoDespService;
        this.tipoDespQueryService = tipoDespQueryService;
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
        return ResponseEntity.created(new URI("/api/tipo-desps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-desps} : Updates an existing tipoDesp.
     *
     * @param tipoDesp the tipoDesp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDesp,
     * or with status {@code 400 (Bad Request)} if the tipoDesp is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoDesp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-desps")
    public ResponseEntity<TipoDesp> updateTipoDesp(@RequestBody TipoDesp tipoDesp) throws URISyntaxException {
        log.debug("REST request to update TipoDesp : {}", tipoDesp);
        if (tipoDesp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoDesp result = tipoDespService.save(tipoDesp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoDesp.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-desps} : get all the tipoDesps.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoDesps in body.
     */
    @GetMapping("/tipo-desps")
    public ResponseEntity<List<TipoDesp>> getAllTipoDesps(TipoDespCriteria criteria, Pageable pageable) {
        log.debug("REST request to get TipoDesps by criteria: {}", criteria);
        Page<TipoDesp> page = tipoDespQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /tipo-desps/count} : count all the tipoDesps.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/tipo-desps/count")
    public ResponseEntity<Long> countTipoDesps(TipoDespCriteria criteria) {
        log.debug("REST request to count TipoDesps by criteria: {}", criteria);
        return ResponseEntity.ok().body(tipoDespQueryService.countByCriteria(criteria));
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
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
