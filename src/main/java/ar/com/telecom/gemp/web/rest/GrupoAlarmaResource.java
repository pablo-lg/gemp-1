package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.GrupoAlarma;
import ar.com.telecom.gemp.repository.GrupoAlarmaRepository;
import ar.com.telecom.gemp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ar.com.telecom.gemp.domain.GrupoAlarma}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GrupoAlarmaResource {

    private final Logger log = LoggerFactory.getLogger(GrupoAlarmaResource.class);

    private static final String ENTITY_NAME = "grupoAlarma";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GrupoAlarmaRepository grupoAlarmaRepository;

    public GrupoAlarmaResource(GrupoAlarmaRepository grupoAlarmaRepository) {
        this.grupoAlarmaRepository = grupoAlarmaRepository;
    }

    /**
     * {@code POST  /grupo-alarmas} : Create a new grupoAlarma.
     *
     * @param grupoAlarma the grupoAlarma to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new grupoAlarma, or with status {@code 400 (Bad Request)} if the grupoAlarma has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/grupo-alarmas")
    public ResponseEntity<GrupoAlarma> createGrupoAlarma(@Valid @RequestBody GrupoAlarma grupoAlarma) throws URISyntaxException {
        log.debug("REST request to save GrupoAlarma : {}", grupoAlarma);
        if (grupoAlarma.getId() != null) {
            throw new BadRequestAlertException("A new grupoAlarma cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GrupoAlarma result = grupoAlarmaRepository.save(grupoAlarma);
        return ResponseEntity.created(new URI("/api/grupo-alarmas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grupo-alarmas} : Updates an existing grupoAlarma.
     *
     * @param grupoAlarma the grupoAlarma to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoAlarma,
     * or with status {@code 400 (Bad Request)} if the grupoAlarma is not valid,
     * or with status {@code 500 (Internal Server Error)} if the grupoAlarma couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/grupo-alarmas")
    public ResponseEntity<GrupoAlarma> updateGrupoAlarma(@Valid @RequestBody GrupoAlarma grupoAlarma) throws URISyntaxException {
        log.debug("REST request to update GrupoAlarma : {}", grupoAlarma);
        if (grupoAlarma.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GrupoAlarma result = grupoAlarmaRepository.save(grupoAlarma);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, grupoAlarma.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /grupo-alarmas} : get all the grupoAlarmas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grupoAlarmas in body.
     */
    @GetMapping("/grupo-alarmas")
    public List<GrupoAlarma> getAllGrupoAlarmas() {
        log.debug("REST request to get all GrupoAlarmas");
        return grupoAlarmaRepository.findAll();
    }

    /**
     * {@code GET  /grupo-alarmas/:id} : get the "id" grupoAlarma.
     *
     * @param id the id of the grupoAlarma to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the grupoAlarma, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/grupo-alarmas/{id}")
    public ResponseEntity<GrupoAlarma> getGrupoAlarma(@PathVariable Long id) {
        log.debug("REST request to get GrupoAlarma : {}", id);
        Optional<GrupoAlarma> grupoAlarma = grupoAlarmaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(grupoAlarma);
    }

    /**
     * {@code DELETE  /grupo-alarmas/:id} : delete the "id" grupoAlarma.
     *
     * @param id the id of the grupoAlarma to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/grupo-alarmas/{id}")
    public ResponseEntity<Void> deleteGrupoAlarma(@PathVariable Long id) {
        log.debug("REST request to delete GrupoAlarma : {}", id);
        grupoAlarmaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
