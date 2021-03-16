package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.Pauta;
import ar.com.telecom.gemp.repository.PautaRepository;
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
 * REST controller for managing {@link ar.com.telecom.gemp.domain.Pauta}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PautaResource {

    private final Logger log = LoggerFactory.getLogger(PautaResource.class);

    private static final String ENTITY_NAME = "pauta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PautaRepository pautaRepository;

    public PautaResource(PautaRepository pautaRepository) {
        this.pautaRepository = pautaRepository;
    }

    /**
     * {@code POST  /pautas} : Create a new pauta.
     *
     * @param pauta the pauta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pauta, or with status {@code 400 (Bad Request)} if the pauta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pautas")
    public ResponseEntity<Pauta> createPauta(@RequestBody Pauta pauta) throws URISyntaxException {
        log.debug("REST request to save Pauta : {}", pauta);
        if (pauta.getId() != null) {
            throw new BadRequestAlertException("A new pauta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pauta result = pautaRepository.save(pauta);
        return ResponseEntity.created(new URI("/api/pautas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pautas} : Updates an existing pauta.
     *
     * @param pauta the pauta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pauta,
     * or with status {@code 400 (Bad Request)} if the pauta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pauta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pautas")
    public ResponseEntity<Pauta> updatePauta(@RequestBody Pauta pauta) throws URISyntaxException {
        log.debug("REST request to update Pauta : {}", pauta);
        if (pauta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pauta result = pautaRepository.save(pauta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pauta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pautas} : get all the pautas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pautas in body.
     */
    @GetMapping("/pautas")
    public List<Pauta> getAllPautas() {
        log.debug("REST request to get all Pautas");
        return pautaRepository.findAll();
    }

    /**
     * {@code GET  /pautas/:id} : get the "id" pauta.
     *
     * @param id the id of the pauta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pauta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pautas/{id}")
    public ResponseEntity<Pauta> getPauta(@PathVariable Long id) {
        log.debug("REST request to get Pauta : {}", id);
        Optional<Pauta> pauta = pautaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pauta);
    }

    /**
     * {@code DELETE  /pautas/:id} : delete the "id" pauta.
     *
     * @param id the id of the pauta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pautas/{id}")
    public ResponseEntity<Void> deletePauta(@PathVariable Long id) {
        log.debug("REST request to delete Pauta : {}", id);
        pautaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
