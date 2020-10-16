package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.Segmento;
import ar.com.telecom.gemp.repository.SegmentoRepository;

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

    private static final String DEFAULT_VALOR = "AAAAAAAAAA";
    private static final String UPDATED_VALOR = "BBBBBBBBBB";

    @Autowired
    private SegmentoRepository segmentoRepository;

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
            .descripcion(DEFAULT_DESCRIPCION)
            .valor(DEFAULT_VALOR);
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
            .descripcion(UPDATED_DESCRIPCION)
            .valor(UPDATED_VALOR);
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
        assertThat(testSegmento.getValor()).isEqualTo(DEFAULT_VALOR);
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
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)));
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
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR));
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
        segmentoRepository.saveAndFlush(segmento);

        int databaseSizeBeforeUpdate = segmentoRepository.findAll().size();

        // Update the segmento
        Segmento updatedSegmento = segmentoRepository.findById(segmento.getId()).get();
        // Disconnect from session so that the updates on updatedSegmento are not directly saved in db
        em.detach(updatedSegmento);
        updatedSegmento
            .descripcion(UPDATED_DESCRIPCION)
            .valor(UPDATED_VALOR);

        restSegmentoMockMvc.perform(put("/api/segmentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSegmento)))
            .andExpect(status().isOk());

        // Validate the Segmento in the database
        List<Segmento> segmentoList = segmentoRepository.findAll();
        assertThat(segmentoList).hasSize(databaseSizeBeforeUpdate);
        Segmento testSegmento = segmentoList.get(segmentoList.size() - 1);
        assertThat(testSegmento.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testSegmento.getValor()).isEqualTo(UPDATED_VALOR);
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
        segmentoRepository.saveAndFlush(segmento);

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
