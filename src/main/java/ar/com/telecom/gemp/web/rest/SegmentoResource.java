package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.Segmento;
import ar.com.telecom.gemp.repository.SegmentoRepository;
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
 * REST controller for managing {@link ar.com.telecom.gemp.domain.Segmento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SegmentoResource {

    private final Logger log = LoggerFactory.getLogger(SegmentoResource.class);

    private static final String ENTITY_NAME = "segmento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SegmentoRepository segmentoRepository;

    public SegmentoResource(SegmentoRepository segmentoRepository) {
        this.segmentoRepository = segmentoRepository;
    }

    /**
     * {@code POST  /segmentos} : Create a new segmento.
     *
     * @param segmento the segmento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new segmento, or with status {@code 400 (Bad Request)} if the segmento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/segmentos")
    public ResponseEntity<Segmento> createSegmento(@RequestBody Segmento segmento) throws URISyntaxException {
        log.debug("REST request to save Segmento : {}", segmento);
        if (segmento.getId() != null) {
            throw new BadRequestAlertException("A new segmento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Segmento result = segmentoRepository.save(segmento);
        return ResponseEntity.created(new URI("/api/segmentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /segmentos} : Updates an existing segmento.
     *
     * @param segmento the segmento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated segmento,
     * or with status {@code 400 (Bad Request)} if the segmento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the segmento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/segmentos")
    public ResponseEntity<Segmento> updateSegmento(@RequestBody Segmento segmento) throws URISyntaxException {
        log.debug("REST request to update Segmento : {}", segmento);
        if (segmento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Segmento result = segmentoRepository.save(segmento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, segmento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /segmentos} : get all the segmentos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of segmentos in body.
     */
    @GetMapping("/segmentos")
    public List<Segmento> getAllSegmentos() {
        log.debug("REST request to get all Segmentos");
        return segmentoRepository.findAll();
    }

    /**
     * {@code GET  /segmentos/:id} : get the "id" segmento.
     *
     * @param id the id of the segmento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the segmento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/segmentos/{id}")
    public ResponseEntity<Segmento> getSegmento(@PathVariable Long id) {
        log.debug("REST request to get Segmento : {}", id);
        Optional<Segmento> segmento = segmentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(segmento);
    }

    /**
     * {@code DELETE  /segmentos/:id} : delete the "id" segmento.
     *
     * @param id the id of the segmento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/segmentos/{id}")
    public ResponseEntity<Void> deleteSegmento(@PathVariable Long id) {
        log.debug("REST request to delete Segmento : {}", id);
        segmentoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
