package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.Despliegue;
import ar.com.telecom.gemp.repository.DespliegueRepository;
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
 * REST controller for managing {@link ar.com.telecom.gemp.domain.Despliegue}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DespliegueResource {

    private final Logger log = LoggerFactory.getLogger(DespliegueResource.class);

    private static final String ENTITY_NAME = "despliegue";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DespliegueRepository despliegueRepository;

    public DespliegueResource(DespliegueRepository despliegueRepository) {
        this.despliegueRepository = despliegueRepository;
    }

    /**
     * {@code POST  /despliegues} : Create a new despliegue.
     *
     * @param despliegue the despliegue to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new despliegue, or with status {@code 400 (Bad Request)} if the despliegue has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/despliegues")
    public ResponseEntity<Despliegue> createDespliegue(@RequestBody Despliegue despliegue) throws URISyntaxException {
        log.debug("REST request to save Despliegue : {}", despliegue);
        if (despliegue.getId() != null) {
            throw new BadRequestAlertException("A new despliegue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Despliegue result = despliegueRepository.save(despliegue);
        return ResponseEntity.created(new URI("/api/despliegues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /despliegues} : Updates an existing despliegue.
     *
     * @param despliegue the despliegue to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated despliegue,
     * or with status {@code 400 (Bad Request)} if the despliegue is not valid,
     * or with status {@code 500 (Internal Server Error)} if the despliegue couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/despliegues")
    public ResponseEntity<Despliegue> updateDespliegue(@RequestBody Despliegue despliegue) throws URISyntaxException {
        log.debug("REST request to update Despliegue : {}", despliegue);
        if (despliegue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Despliegue result = despliegueRepository.save(despliegue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, despliegue.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /despliegues} : get all the despliegues.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of despliegues in body.
     */
    @GetMapping("/despliegues")
    public List<Despliegue> getAllDespliegues() {
        log.debug("REST request to get all Despliegues");
        return despliegueRepository.findAll();
    }

    /**
     * {@code GET  /despliegues/:id} : get the "id" despliegue.
     *
     * @param id the id of the despliegue to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the despliegue, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/despliegues/{id}")
    public ResponseEntity<Despliegue> getDespliegue(@PathVariable Long id) {
        log.debug("REST request to get Despliegue : {}", id);
        Optional<Despliegue> despliegue = despliegueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(despliegue);
    }

    /**
     * {@code DELETE  /despliegues/:id} : delete the "id" despliegue.
     *
     * @param id the id of the despliegue to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/despliegues/{id}")
    public ResponseEntity<Void> deleteDespliegue(@PathVariable Long id) {
        log.debug("REST request to delete Despliegue : {}", id);
        despliegueRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
