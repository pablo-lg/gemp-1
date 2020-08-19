package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.Segmento;
import ar.com.telecom.gemp.repository.SegmentoRepository;
import ar.com.telecom.gemp.service.SegmentoService;
import ar.com.telecom.gemp.service.dto.SegmentoCriteria;
import ar.com.telecom.gemp.service.SegmentoQueryService;

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
 * Integration tests for the {@link SegmentoResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SegmentoResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private SegmentoRepository segmentoRepository;

    @Autowired
    private SegmentoService segmentoService;

    @Autowired
    private SegmentoQueryService segmentoQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSegmentoMockMvc;

    private Segmento segmento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Segmento createEntity(EntityManager em) {
        Segmento segmento = new Segmento()
            .descripcion(DEFAULT_DESCRIPCION);
        return segmento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Segmento createUpdatedEntity(EntityManager em) {
        Segmento segmento = new Segmento()
            .descripcion(UPDATED_DESCRIPCION);
        return segmento;
    }

    @BeforeEach
    public void initTest() {
        segmento = createEntity(em);
    }

    @Test
    @Transactional
    public void createSegmento() throws Exception {
        int databaseSizeBeforeCreate = segmentoRepository.findAll().size();
        // Create the Segmento
        restSegmentoMockMvc.perform(post("/api/segmentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(segmento)))
            .andExpect(status().isCreated());

        // Validate the Segmento in the database
        List<Segmento> segmentoList = segmentoRepository.findAll();
        assertThat(segmentoList).hasSize(databaseSizeBeforeCreate + 1);
        Segmento testSegmento = segmentoList.get(segmentoList.size() - 1);
        assertThat(testSegmento.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createSegmentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = segmentoRepository.findAll().size();

        // Create the Segmento with an existing ID
        segmento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSegmentoMockMvc.perform(post("/api/segmentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(segmento)))
            .andExpect(status().isBadRequest());

        // Validate the Segmento in the database
        List<Segmento> segmentoList = segmentoRepository.findAll();
        assertThat(segmentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSegmentos() throws Exception {
        // Initialize the database
        segmentoRepository.saveAndFlush(segmento);

        // Get all the segmentoList
        restSegmentoMockMvc.perform(get("/api/segmentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(segmento.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getSegmento() throws Exception {
        // Initialize the database
        segmentoRepository.saveAndFlush(segmento);

        // Get the segmento
        restSegmentoMockMvc.perform(get("/api/segmentos/{id}", segmento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(segmento.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }


    @Test
    @Transactional
    public void getSegmentosByIdFiltering() throws Exception {
        // Initialize the database
        segmentoRepository.saveAndFlush(segmento);

        Long id = segmento.getId();

        defaultSegmentoShouldBeFound("id.equals=" + id);
        defaultSegmentoShouldNotBeFound("id.notEquals=" + id);

        defaultSegmentoShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultSegmentoShouldNotBeFound("id.greaterThan=" + id);

        defaultSegmentoShouldBeFound("id.lessThanOrEqual=" + id);
        defaultSegmentoShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllSegmentosByDescripcionIsEqualToSomething() throws Exception {
        // Initialize the database
        segmentoRepository.saveAndFlush(segmento);

        // Get all the segmentoList where descripcion equals to DEFAULT_DESCRIPCION
        defaultSegmentoShouldBeFound("descripcion.equals=" + DEFAULT_DESCRIPCION);

        // Get all the segmentoList where descripcion equals to UPDATED_DESCRIPCION
        defaultSegmentoShouldNotBeFound("descripcion.equals=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllSegmentosByDescripcionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        segmentoRepository.saveAndFlush(segmento);

        // Get all the segmentoList where descripcion not equals to DEFAULT_DESCRIPCION
        defaultSegmentoShouldNotBeFound("descripcion.notEquals=" + DEFAULT_DESCRIPCION);

        // Get all the segmentoList where descripcion not equals to UPDATED_DESCRIPCION
        defaultSegmentoShouldBeFound("descripcion.notEquals=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllSegmentosByDescripcionIsInShouldWork() throws Exception {
        // Initialize the database
        segmentoRepository.saveAndFlush(segmento);

        // Get all the segmentoList where descripcion in DEFAULT_DESCRIPCION or UPDATED_DESCRIPCION
        defaultSegmentoShouldBeFound("descripcion.in=" + DEFAULT_DESCRIPCION + "," + UPDATED_DESCRIPCION);

        // Get all the segmentoList where descripcion equals to UPDATED_DESCRIPCION
        defaultSegmentoShouldNotBeFound("descripcion.in=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllSegmentosByDescripcionIsNullOrNotNull() throws Exception {
        // Initialize the database
        segmentoRepository.saveAndFlush(segmento);

        // Get all the segmentoList where descripcion is not null
        defaultSegmentoShouldBeFound("descripcion.specified=true");

        // Get all the segmentoList where descripcion is null
        defaultSegmentoShouldNotBeFound("descripcion.specified=false");
    }
                @Test
    @Transactional
    public void getAllSegmentosByDescripcionContainsSomething() throws Exception {
        // Initialize the database
        segmentoRepository.saveAndFlush(segmento);

        // Get all the segmentoList where descripcion contains DEFAULT_DESCRIPCION
        defaultSegmentoShouldBeFound("descripcion.contains=" + DEFAULT_DESCRIPCION);

        // Get all the segmentoList where descripcion contains UPDATED_DESCRIPCION
        defaultSegmentoShouldNotBeFound("descripcion.contains=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllSegmentosByDescripcionNotContainsSomething() throws Exception {
        // Initialize the database
        segmentoRepository.saveAndFlush(segmento);

        // Get all the segmentoList where descripcion does not contain DEFAULT_DESCRIPCION
        defaultSegmentoShouldNotBeFound("descripcion.doesNotContain=" + DEFAULT_DESCRIPCION);

        // Get all the segmentoList where descripcion does not contain UPDATED_DESCRIPCION
        defaultSegmentoShouldBeFound("descripcion.doesNotContain=" + UPDATED_DESCRIPCION);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultSegmentoShouldBeFound(String filter) throws Exception {
        restSegmentoMockMvc.perform(get("/api/segmentos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(segmento.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));

        // Check, that the count call also returns 1
        restSegmentoMockMvc.perform(get("/api/segmentos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultSegmentoShouldNotBeFound(String filter) throws Exception {
        restSegmentoMockMvc.perform(get("/api/segmentos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restSegmentoMockMvc.perform(get("/api/segmentos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    public void getNonExistingSegmento() throws Exception {
        // Get the segmento
        restSegmentoMockMvc.perform(get("/api/segmentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSegmento() throws Exception {
        // Initialize the database
        segmentoService.save(segmento);

        int databaseSizeBeforeUpdate = segmentoRepository.findAll().size();

        // Update the segmento
        Segmento updatedSegmento = segmentoRepository.findById(segmento.getId()).get();
        // Disconnect from session so that the updates on updatedSegmento are not directly saved in db
        em.detach(updatedSegmento);
        updatedSegmento
            .descripcion(UPDATED_DESCRIPCION);

        restSegmentoMockMvc.perform(put("/api/segmentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSegmento)))
            .andExpect(status().isOk());

        // Validate the Segmento in the database
        List<Segmento> segmentoList = segmentoRepository.findAll();
        assertThat(segmentoList).hasSize(databaseSizeBeforeUpdate);
        Segmento testSegmento = segmentoList.get(segmentoList.size() - 1);
        assertThat(testSegmento.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingSegmento() throws Exception {
        int databaseSizeBeforeUpdate = segmentoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSegmentoMockMvc.perform(put("/api/segmentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(segmento)))
            .andExpect(status().isBadRequest());

        // Validate the Segmento in the database
        List<Segmento> segmentoList = segmentoRepository.findAll();
        assertThat(segmentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSegmento() throws Exception {
        // Initialize the database
        segmentoService.save(segmento);

        int databaseSizeBeforeDelete = segmentoRepository.findAll().size();

        // Delete the segmento
        restSegmentoMockMvc.perform(delete("/api/segmentos/{id}", segmento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Segmento> segmentoList = segmentoRepository.findAll();
        assertThat(segmentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
