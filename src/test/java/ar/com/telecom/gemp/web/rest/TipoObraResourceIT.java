package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.TipoObra;
import ar.com.telecom.gemp.repository.TipoObraRepository;
import ar.com.telecom.gemp.service.TipoObraService;
import ar.com.telecom.gemp.service.dto.TipoObraCriteria;
import ar.com.telecom.gemp.service.TipoObraQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TipoObraResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoObraResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_VALOR = "AAAAAAAAAA";
    private static final String UPDATED_VALOR = "BBBBBBBBBB";

    @Autowired
    private TipoObraRepository tipoObraRepository;

    @Autowired
    private TipoObraService tipoObraService;

    @Autowired
    private TipoObraQueryService tipoObraQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoObraMockMvc;

    private TipoObra tipoObra;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoObra createEntity(EntityManager em) {
        TipoObra tipoObra = new TipoObra()
            .descripcion(DEFAULT_DESCRIPCION)
            .valor(DEFAULT_VALOR);
        return tipoObra;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoObra createUpdatedEntity(EntityManager em) {
        TipoObra tipoObra = new TipoObra()
            .descripcion(UPDATED_DESCRIPCION)
            .valor(UPDATED_VALOR);
        return tipoObra;
    }

    @BeforeEach
    public void initTest() {
        tipoObra = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoObra() throws Exception {
        int databaseSizeBeforeCreate = tipoObraRepository.findAll().size();
        // Create the TipoObra
        restTipoObraMockMvc.perform(post("/api/tipo-obras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoObra)))
            .andExpect(status().isCreated());

        // Validate the TipoObra in the database
        List<TipoObra> tipoObraList = tipoObraRepository.findAll();
        assertThat(tipoObraList).hasSize(databaseSizeBeforeCreate + 1);
        TipoObra testTipoObra = tipoObraList.get(tipoObraList.size() - 1);
        assertThat(testTipoObra.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testTipoObra.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    public void createTipoObraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoObraRepository.findAll().size();

        // Create the TipoObra with an existing ID
        tipoObra.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoObraMockMvc.perform(post("/api/tipo-obras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoObra)))
            .andExpect(status().isBadRequest());

        // Validate the TipoObra in the database
        List<TipoObra> tipoObraList = tipoObraRepository.findAll();
        assertThat(tipoObraList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoObras() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList
        restTipoObraMockMvc.perform(get("/api/tipo-obras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoObra.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)));
    }
    
    @Test
    @Transactional
    public void getTipoObra() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get the tipoObra
        restTipoObraMockMvc.perform(get("/api/tipo-obras/{id}", tipoObra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoObra.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR));
    }


    @Test
    @Transactional
    public void getTipoObrasByIdFiltering() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        Long id = tipoObra.getId();

        defaultTipoObraShouldBeFound("id.equals=" + id);
        defaultTipoObraShouldNotBeFound("id.notEquals=" + id);

        defaultTipoObraShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultTipoObraShouldNotBeFound("id.greaterThan=" + id);

        defaultTipoObraShouldBeFound("id.lessThanOrEqual=" + id);
        defaultTipoObraShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllTipoObrasByDescripcionIsEqualToSomething() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList where descripcion equals to DEFAULT_DESCRIPCION
        defaultTipoObraShouldBeFound("descripcion.equals=" + DEFAULT_DESCRIPCION);

        // Get all the tipoObraList where descripcion equals to UPDATED_DESCRIPCION
        defaultTipoObraShouldNotBeFound("descripcion.equals=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllTipoObrasByDescripcionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList where descripcion not equals to DEFAULT_DESCRIPCION
        defaultTipoObraShouldNotBeFound("descripcion.notEquals=" + DEFAULT_DESCRIPCION);

        // Get all the tipoObraList where descripcion not equals to UPDATED_DESCRIPCION
        defaultTipoObraShouldBeFound("descripcion.notEquals=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllTipoObrasByDescripcionIsInShouldWork() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList where descripcion in DEFAULT_DESCRIPCION or UPDATED_DESCRIPCION
        defaultTipoObraShouldBeFound("descripcion.in=" + DEFAULT_DESCRIPCION + "," + UPDATED_DESCRIPCION);

        // Get all the tipoObraList where descripcion equals to UPDATED_DESCRIPCION
        defaultTipoObraShouldNotBeFound("descripcion.in=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllTipoObrasByDescripcionIsNullOrNotNull() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList where descripcion is not null
        defaultTipoObraShouldBeFound("descripcion.specified=true");

        // Get all the tipoObraList where descripcion is null
        defaultTipoObraShouldNotBeFound("descripcion.specified=false");
    }
                @Test
    @Transactional
    public void getAllTipoObrasByDescripcionContainsSomething() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList where descripcion contains DEFAULT_DESCRIPCION
        defaultTipoObraShouldBeFound("descripcion.contains=" + DEFAULT_DESCRIPCION);

        // Get all the tipoObraList where descripcion contains UPDATED_DESCRIPCION
        defaultTipoObraShouldNotBeFound("descripcion.contains=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllTipoObrasByDescripcionNotContainsSomething() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList where descripcion does not contain DEFAULT_DESCRIPCION
        defaultTipoObraShouldNotBeFound("descripcion.doesNotContain=" + DEFAULT_DESCRIPCION);

        // Get all the tipoObraList where descripcion does not contain UPDATED_DESCRIPCION
        defaultTipoObraShouldBeFound("descripcion.doesNotContain=" + UPDATED_DESCRIPCION);
    }


    @Test
    @Transactional
    public void getAllTipoObrasByValorIsEqualToSomething() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList where valor equals to DEFAULT_VALOR
        defaultTipoObraShouldBeFound("valor.equals=" + DEFAULT_VALOR);

        // Get all the tipoObraList where valor equals to UPDATED_VALOR
        defaultTipoObraShouldNotBeFound("valor.equals=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void getAllTipoObrasByValorIsNotEqualToSomething() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList where valor not equals to DEFAULT_VALOR
        defaultTipoObraShouldNotBeFound("valor.notEquals=" + DEFAULT_VALOR);

        // Get all the tipoObraList where valor not equals to UPDATED_VALOR
        defaultTipoObraShouldBeFound("valor.notEquals=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void getAllTipoObrasByValorIsInShouldWork() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList where valor in DEFAULT_VALOR or UPDATED_VALOR
        defaultTipoObraShouldBeFound("valor.in=" + DEFAULT_VALOR + "," + UPDATED_VALOR);

        // Get all the tipoObraList where valor equals to UPDATED_VALOR
        defaultTipoObraShouldNotBeFound("valor.in=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void getAllTipoObrasByValorIsNullOrNotNull() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList where valor is not null
        defaultTipoObraShouldBeFound("valor.specified=true");

        // Get all the tipoObraList where valor is null
        defaultTipoObraShouldNotBeFound("valor.specified=false");
    }
                @Test
    @Transactional
    public void getAllTipoObrasByValorContainsSomething() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList where valor contains DEFAULT_VALOR
        defaultTipoObraShouldBeFound("valor.contains=" + DEFAULT_VALOR);

        // Get all the tipoObraList where valor contains UPDATED_VALOR
        defaultTipoObraShouldNotBeFound("valor.contains=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void getAllTipoObrasByValorNotContainsSomething() throws Exception {
        // Initialize the database
        tipoObraRepository.saveAndFlush(tipoObra);

        // Get all the tipoObraList where valor does not contain DEFAULT_VALOR
        defaultTipoObraShouldNotBeFound("valor.doesNotContain=" + DEFAULT_VALOR);

        // Get all the tipoObraList where valor does not contain UPDATED_VALOR
        defaultTipoObraShouldBeFound("valor.doesNotContain=" + UPDATED_VALOR);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultTipoObraShouldBeFound(String filter) throws Exception {
        restTipoObraMockMvc.perform(get("/api/tipo-obras?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoObra.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)));

        // Check, that the count call also returns 1
        restTipoObraMockMvc.perform(get("/api/tipo-obras/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultTipoObraShouldNotBeFound(String filter) throws Exception {
        restTipoObraMockMvc.perform(get("/api/tipo-obras?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restTipoObraMockMvc.perform(get("/api/tipo-obras/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    public void getNonExistingTipoObra() throws Exception {
        // Get the tipoObra
        restTipoObraMockMvc.perform(get("/api/tipo-obras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoObra() throws Exception {
        // Initialize the database
        tipoObraService.save(tipoObra);

        int databaseSizeBeforeUpdate = tipoObraRepository.findAll().size();

        // Update the tipoObra
        TipoObra updatedTipoObra = tipoObraRepository.findById(tipoObra.getId()).get();
        // Disconnect from session so that the updates on updatedTipoObra are not directly saved in db
        em.detach(updatedTipoObra);
        updatedTipoObra
            .descripcion(UPDATED_DESCRIPCION)
            .valor(UPDATED_VALOR);

        restTipoObraMockMvc.perform(put("/api/tipo-obras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoObra)))
            .andExpect(status().isOk());

        // Validate the TipoObra in the database
        List<TipoObra> tipoObraList = tipoObraRepository.findAll();
        assertThat(tipoObraList).hasSize(databaseSizeBeforeUpdate);
        TipoObra testTipoObra = tipoObraList.get(tipoObraList.size() - 1);
        assertThat(testTipoObra.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testTipoObra.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoObra() throws Exception {
        int databaseSizeBeforeUpdate = tipoObraRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoObraMockMvc.perform(put("/api/tipo-obras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoObra)))
            .andExpect(status().isBadRequest());

        // Validate the TipoObra in the database
        List<TipoObra> tipoObraList = tipoObraRepository.findAll();
        assertThat(tipoObraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoObra() throws Exception {
        // Initialize the database
        tipoObraService.save(tipoObra);

        int databaseSizeBeforeDelete = tipoObraRepository.findAll().size();

        // Delete the tipoObra
        restTipoObraMockMvc.perform(delete("/api/tipo-obras/{id}", tipoObra.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoObra> tipoObraList = tipoObraRepository.findAll();
        assertThat(tipoObraList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
