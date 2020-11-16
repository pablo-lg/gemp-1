package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.Emprendimiento;
import ar.com.telecom.gemp.repository.EmprendimientoRepository;
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
 * REST controller for managing {@link ar.com.telecom.gemp.domain.Emprendimiento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EmprendimientoResource {

    private final Logger log = LoggerFactory.getLogger(EmprendimientoResource.class);

    private static final String ENTITY_NAME = "emprendimiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmprendimientoRepository emprendimientoRepository;

    public EmprendimientoResource(EmprendimientoRepository emprendimientoRepository) {
        this.emprendimientoRepository = emprendimientoRepository;
    }

    /**
     * {@code POST  /emprendimientos} : Create a new emprendimiento.
     *
     * @param emprendimiento the emprendimiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new emprendimiento, or with status {@code 400 (Bad Request)} if the emprendimiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/emprendimientos")
    public ResponseEntity<Emprendimiento> createEmprendimiento(@RequestBody Emprendimiento emprendimiento) throws URISyntaxException {
        log.debug("REST request to save Emprendimiento : {}", emprendimiento);
        if (emprendimiento.getId() != null) {
            throw new BadRequestAlertException("A new emprendimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Emprendimiento result = emprendimientoRepository.save(emprendimiento);
        return ResponseEntity.created(new URI("/api/emprendimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /emprendimientos} : Updates an existing emprendimiento.
     *
     * @param emprendimiento the emprendimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated emprendimiento,
     * or with status {@code 400 (Bad Request)} if the emprendimiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the emprendimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/emprendimientos")
    public ResponseEntity<Emprendimiento> updateEmprendimiento(@RequestBody Emprendimiento emprendimiento) throws URISyntaxException {
        log.debug("REST request to update Emprendimiento : {}", emprendimiento);
        if (emprendimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Emprendimiento result = emprendimientoRepository.save(emprendimiento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, emprendimiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /emprendimientos} : get all the emprendimientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of emprendimientos in body.
     */
    @GetMapping("/emprendimientos")
    public List<Emprendimiento> getAllEmprendimientos() {
        log.debug("REST request to get all Emprendimientos");
        return emprendimientoRepository.findAll();
    }

    /**
     * {@code GET  /emprendimientos/:id} : get the "id" emprendimiento.
     *
     * @param id the id of the emprendimiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the emprendimiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/emprendimientos/{id}")
    public ResponseEntity<Emprendimiento> getEmprendimiento(@PathVariable Long id) {
        log.debug("REST request to get Emprendimiento : {}", id);
        Optional<Emprendimiento> emprendimiento = emprendimientoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(emprendimiento);
    }

    /**
     * {@code DELETE  /emprendimientos/:id} : delete the "id" emprendimiento.
     *
     * @param id the id of the emprendimiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/emprendimientos/{id}")
    public ResponseEntity<Void> deleteEmprendimiento(@PathVariable Long id) {
        log.debug("REST request to delete Emprendimiento : {}", id);
        emprendimientoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
