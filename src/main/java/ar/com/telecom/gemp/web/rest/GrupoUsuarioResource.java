package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.GrupoUsuario;
import ar.com.telecom.gemp.repository.GrupoUsuarioRepository;
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
 * REST controller for managing {@link ar.com.telecom.gemp.domain.GrupoUsuario}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GrupoUsuarioResource {

    private final Logger log = LoggerFactory.getLogger(GrupoUsuarioResource.class);

    private static final String ENTITY_NAME = "grupoUsuario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GrupoUsuarioRepository grupoUsuarioRepository;

    public GrupoUsuarioResource(GrupoUsuarioRepository grupoUsuarioRepository) {
        this.grupoUsuarioRepository = grupoUsuarioRepository;
    }

    /**
     * {@code POST  /grupo-usuarios} : Create a new grupoUsuario.
     *
     * @param grupoUsuario the grupoUsuario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new grupoUsuario, or with status {@code 400 (Bad Request)} if the grupoUsuario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/grupo-usuarios")
    public ResponseEntity<GrupoUsuario> createGrupoUsuario(@RequestBody GrupoUsuario grupoUsuario) throws URISyntaxException {
        log.debug("REST request to save GrupoUsuario : {}", grupoUsuario);
        if (grupoUsuario.getId() != null) {
            throw new BadRequestAlertException("A new grupoUsuario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GrupoUsuario result = grupoUsuarioRepository.save(grupoUsuario);
        return ResponseEntity.created(new URI("/api/grupo-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grupo-usuarios} : Updates an existing grupoUsuario.
     *
     * @param grupoUsuario the grupoUsuario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoUsuario,
     * or with status {@code 400 (Bad Request)} if the grupoUsuario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the grupoUsuario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/grupo-usuarios")
    public ResponseEntity<GrupoUsuario> updateGrupoUsuario(@RequestBody GrupoUsuario grupoUsuario) throws URISyntaxException {
        log.debug("REST request to update GrupoUsuario : {}", grupoUsuario);
        if (grupoUsuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GrupoUsuario result = grupoUsuarioRepository.save(grupoUsuario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, grupoUsuario.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /grupo-usuarios} : get all the grupoUsuarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grupoUsuarios in body.
     */
    @GetMapping("/grupo-usuarios")
    public List<GrupoUsuario> getAllGrupoUsuarios() {
        log.debug("REST request to get all GrupoUsuarios");
        return grupoUsuarioRepository.findAll();
    }

    /**
     * {@code GET  /grupo-usuarios/:id} : get the "id" grupoUsuario.
     *
     * @param id the id of the grupoUsuario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the grupoUsuario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/grupo-usuarios/{id}")
    public ResponseEntity<GrupoUsuario> getGrupoUsuario(@PathVariable Long id) {
        log.debug("REST request to get GrupoUsuario : {}", id);
        Optional<GrupoUsuario> grupoUsuario = grupoUsuarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(grupoUsuario);
    }

    /**
     * {@code DELETE  /grupo-usuarios/:id} : delete the "id" grupoUsuario.
     *
     * @param id the id of the grupoUsuario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/grupo-usuarios/{id}")
    public ResponseEntity<Void> deleteGrupoUsuario(@PathVariable Long id) {
        log.debug("REST request to delete GrupoUsuario : {}", id);
        grupoUsuarioRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
