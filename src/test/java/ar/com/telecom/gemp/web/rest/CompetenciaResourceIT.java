package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.Competencia;
import ar.com.telecom.gemp.repository.CompetenciaRepository;

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
 * Integration tests for the {@link CompetenciaResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CompetenciaResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private CompetenciaRepository competenciaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCompetenciaMockMvc;

    private Competencia competencia;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Competencia createEntity(EntityManager em) {
        Competencia competencia = new Competencia()
            .descripcion(DEFAULT_DESCRIPCION);
        return competencia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Competencia createUpdatedEntity(EntityManager em) {
        Competencia competencia = new Competencia()
            .descripcion(UPDATED_DESCRIPCION);
        return competencia;
    }

    @BeforeEach
    public void initTest() {
        competencia = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompetencia() throws Exception {
        int databaseSizeBeforeCreate = competenciaRepository.findAll().size();
        // Create the Competencia
        restCompetenciaMockMvc.perform(post("/api/competencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(competencia)))
            .andExpect(status().isCreated());

        // Validate the Competencia in the database
        List<Competencia> competenciaList = competenciaRepository.findAll();
        assertThat(competenciaList).hasSize(databaseSizeBeforeCreate + 1);
        Competencia testCompetencia = competenciaList.get(competenciaList.size() - 1);
        assertThat(testCompetencia.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createCompetenciaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = competenciaRepository.findAll().size();

        // Create the Competencia with an existing ID
        competencia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompetenciaMockMvc.perform(post("/api/competencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(competencia)))
            .andExpect(status().isBadRequest());

        // Validate the Competencia in the database
        List<Competencia> competenciaList = competenciaRepository.findAll();
        assertThat(competenciaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCompetencias() throws Exception {
        // Initialize the database
        competenciaRepository.saveAndFlush(competencia);

        // Get all the competenciaList
        restCompetenciaMockMvc.perform(get("/api/competencias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(competencia.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getCompetencia() throws Exception {
        // Initialize the database
        competenciaRepository.saveAndFlush(competencia);

        // Get the competencia
        restCompetenciaMockMvc.perform(get("/api/competencias/{id}", competencia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(competencia.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }
    @Test
    @Transactional
    public void getNonExistingCompetencia() throws Exception {
        // Get the competencia
        restCompetenciaMockMvc.perform(get("/api/competencias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompetencia() throws Exception {
        // Initialize the database
        competenciaRepository.saveAndFlush(competencia);

        int databaseSizeBeforeUpdate = competenciaRepository.findAll().size();

        // Update the competencia
        Competencia updatedCompetencia = competenciaRepository.findById(competencia.getId()).get();
        // Disconnect from session so that the updates on updatedCompetencia are not directly saved in db
        em.detach(updatedCompetencia);
        updatedCompetencia
            .descripcion(UPDATED_DESCRIPCION);

        restCompetenciaMockMvc.perform(put("/api/competencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompetencia)))
            .andExpect(status().isOk());

        // Validate the Competencia in the database
        List<Competencia> competenciaList = competenciaRepository.findAll();
        assertThat(competenciaList).hasSize(databaseSizeBeforeUpdate);
        Competencia testCompetencia = competenciaList.get(competenciaList.size() - 1);
        assertThat(testCompetencia.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingCompetencia() throws Exception {
        int databaseSizeBeforeUpdate = competenciaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompetenciaMockMvc.perform(put("/api/competencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(competencia)))
            .andExpect(status().isBadRequest());

        // Validate the Competencia in the database
        List<Competencia> competenciaList = competenciaRepository.findAll();
        assertThat(competenciaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompetencia() throws Exception {
        // Initialize the database
        competenciaRepository.saveAndFlush(competencia);

        int databaseSizeBeforeDelete = competenciaRepository.findAll().size();

        // Delete the competencia
        restCompetenciaMockMvc.perform(delete("/api/competencias/{id}", competencia.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Competencia> competenciaList = competenciaRepository.findAll();
        assertThat(competenciaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
