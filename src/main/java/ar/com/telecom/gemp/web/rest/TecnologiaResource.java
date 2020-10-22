package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.Tecnologia;
import ar.com.telecom.gemp.repository.TecnologiaRepository;
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
 * REST controller for managing {@link ar.com.telecom.gemp.domain.Tecnologia}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TecnologiaResource {

    private final Logger log = LoggerFactory.getLogger(TecnologiaResource.class);

    private static final String ENTITY_NAME = "tecnologia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TecnologiaRepository tecnologiaRepository;

    public TecnologiaResource(TecnologiaRepository tecnologiaRepository) {
        this.tecnologiaRepository = tecnologiaRepository;
    }

    /**
     * {@code POST  /tecnologias} : Create a new tecnologia.
     *
     * @param tecnologia the tecnologia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tecnologia, or with status {@code 400 (Bad Request)} if the tecnologia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tecnologias")
    public ResponseEntity<Tecnologia> createTecnologia(@RequestBody Tecnologia tecnologia) throws URISyntaxException {
        log.debug("REST request to save Tecnologia : {}", tecnologia);
        if (tecnologia.getId() != null) {
            throw new BadRequestAlertException("A new tecnologia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tecnologia result = tecnologiaRepository.save(tecnologia);
        return ResponseEntity.created(new URI("/api/tecnologias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tecnologias} : Updates an existing tecnologia.
     *
     * @param tecnologia the tecnologia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tecnologia,
     * or with status {@code 400 (Bad Request)} if the tecnologia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tecnologia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tecnologias")
    public ResponseEntity<Tecnologia> updateTecnologia(@RequestBody Tecnologia tecnologia) throws URISyntaxException {
        log.debug("REST request to update Tecnologia : {}", tecnologia);
        if (tecnologia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tecnologia result = tecnologiaRepository.save(tecnologia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tecnologia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tecnologias} : get all the tecnologias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tecnologias in body.
     */
    @GetMapping("/tecnologias")
    public List<Tecnologia> getAllTecnologias() {
        log.debug("REST request to get all Tecnologias");
        return tecnologiaRepository.findAll();
    }

    /**
     * {@code GET  /tecnologias/:id} : get the "id" tecnologia.
     *
     * @param id the id of the tecnologia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tecnologia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tecnologias/{id}")
    public ResponseEntity<Tecnologia> getTecnologia(@PathVariable Long id) {
        log.debug("REST request to get Tecnologia : {}", id);
        Optional<Tecnologia> tecnologia = tecnologiaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tecnologia);
    }

    /**
     * {@code DELETE  /tecnologias/:id} : delete the "id" tecnologia.
     *
     * @param id the id of the tecnologia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tecnologias/{id}")
    public ResponseEntity<Void> deleteTecnologia(@PathVariable Long id) {
        log.debug("REST request to delete Tecnologia : {}", id);
        tecnologiaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
