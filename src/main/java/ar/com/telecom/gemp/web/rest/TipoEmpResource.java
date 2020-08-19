package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.TipoEmp;
import ar.com.telecom.gemp.service.TipoEmpService;
import ar.com.telecom.gemp.web.rest.errors.BadRequestAlertException;
import ar.com.telecom.gemp.service.dto.TipoEmpCriteria;
import ar.com.telecom.gemp.service.TipoEmpQueryService;

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
 * REST controller for managing {@link ar.com.telecom.gemp.domain.TipoEmp}.
 */
@RestController
@RequestMapping("/api")
public class TipoEmpResource {

    private final Logger log = LoggerFactory.getLogger(TipoEmpResource.class);

    private static final String ENTITY_NAME = "tipoEmp";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoEmpService tipoEmpService;

    private final TipoEmpQueryService tipoEmpQueryService;

    public TipoEmpResource(TipoEmpService tipoEmpService, TipoEmpQueryService tipoEmpQueryService) {
        this.tipoEmpService = tipoEmpService;
        this.tipoEmpQueryService = tipoEmpQueryService;
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
        TipoEmp result = tipoEmpService.save(tipoEmp);
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
        TipoEmp result = tipoEmpService.save(tipoEmp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoEmp.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-emps} : get all the tipoEmps.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoEmps in body.
     */
    @GetMapping("/tipo-emps")
    public ResponseEntity<List<TipoEmp>> getAllTipoEmps(TipoEmpCriteria criteria, Pageable pageable) {
        log.debug("REST request to get TipoEmps by criteria: {}", criteria);
        Page<TipoEmp> page = tipoEmpQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /tipo-emps/count} : count all the tipoEmps.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/tipo-emps/count")
    public ResponseEntity<Long> countTipoEmps(TipoEmpCriteria criteria) {
        log.debug("REST request to count TipoEmps by criteria: {}", criteria);
        return ResponseEntity.ok().body(tipoEmpQueryService.countByCriteria(criteria));
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
        Optional<TipoEmp> tipoEmp = tipoEmpService.findOne(id);
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
        tipoEmpService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
