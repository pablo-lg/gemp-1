package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.Tecnologia;
import ar.com.telecom.gemp.repository.TecnologiaRepository;

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
 * Integration tests for the {@link TecnologiaResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TecnologiaResourceIT {

    private static final String DEFAULT_VALOR = "AAAAAAAAAA";
    private static final String UPDATED_VALOR = "BBBBBBBBBB";

    @Autowired
    private TecnologiaRepository tecnologiaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTecnologiaMockMvc;

    private Tecnologia tecnologia;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tecnologia createEntity(EntityManager em) {
        Tecnologia tecnologia = new Tecnologia()
            .valor(DEFAULT_VALOR);
        return tecnologia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tecnologia createUpdatedEntity(EntityManager em) {
        Tecnologia tecnologia = new Tecnologia()
            .valor(UPDATED_VALOR);
        return tecnologia;
    }

    @BeforeEach
    public void initTest() {
        tecnologia = createEntity(em);
    }

    @Test
    @Transactional
    public void createTecnologia() throws Exception {
        int databaseSizeBeforeCreate = tecnologiaRepository.findAll().size();
        // Create the Tecnologia
        restTecnologiaMockMvc.perform(post("/api/tecnologias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tecnologia)))
            .andExpect(status().isCreated());

        // Validate the Tecnologia in the database
        List<Tecnologia> tecnologiaList = tecnologiaRepository.findAll();
        assertThat(tecnologiaList).hasSize(databaseSizeBeforeCreate + 1);
        Tecnologia testTecnologia = tecnologiaList.get(tecnologiaList.size() - 1);
        assertThat(testTecnologia.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    public void createTecnologiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tecnologiaRepository.findAll().size();

        // Create the Tecnologia with an existing ID
        tecnologia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTecnologiaMockMvc.perform(post("/api/tecnologias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tecnologia)))
            .andExpect(status().isBadRequest());

        // Validate the Tecnologia in the database
        List<Tecnologia> tecnologiaList = tecnologiaRepository.findAll();
        assertThat(tecnologiaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTecnologias() throws Exception {
        // Initialize the database
        tecnologiaRepository.saveAndFlush(tecnologia);

        // Get all the tecnologiaList
        restTecnologiaMockMvc.perform(get("/api/tecnologias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tecnologia.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)));
    }
    
    @Test
    @Transactional
    public void getTecnologia() throws Exception {
        // Initialize the database
        tecnologiaRepository.saveAndFlush(tecnologia);

        // Get the tecnologia
        restTecnologiaMockMvc.perform(get("/api/tecnologias/{id}", tecnologia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tecnologia.getId().intValue()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR));
    }
    @Test
    @Transactional
    public void getNonExistingTecnologia() throws Exception {
        // Get the tecnologia
        restTecnologiaMockMvc.perform(get("/api/tecnologias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTecnologia() throws Exception {
        // Initialize the database
        tecnologiaRepository.saveAndFlush(tecnologia);

        int databaseSizeBeforeUpdate = tecnologiaRepository.findAll().size();

        // Update the tecnologia
        Tecnologia updatedTecnologia = tecnologiaRepository.findById(tecnologia.getId()).get();
        // Disconnect from session so that the updates on updatedTecnologia are not directly saved in db
        em.detach(updatedTecnologia);
        updatedTecnologia
            .valor(UPDATED_VALOR);

        restTecnologiaMockMvc.perform(put("/api/tecnologias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTecnologia)))
            .andExpect(status().isOk());

        // Validate the Tecnologia in the database
        List<Tecnologia> tecnologiaList = tecnologiaRepository.findAll();
        assertThat(tecnologiaList).hasSize(databaseSizeBeforeUpdate);
        Tecnologia testTecnologia = tecnologiaList.get(tecnologiaList.size() - 1);
        assertThat(testTecnologia.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void updateNonExistingTecnologia() throws Exception {
        int databaseSizeBeforeUpdate = tecnologiaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTecnologiaMockMvc.perform(put("/api/tecnologias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tecnologia)))
            .andExpect(status().isBadRequest());

        // Validate the Tecnologia in the database
        List<Tecnologia> tecnologiaList = tecnologiaRepository.findAll();
        assertThat(tecnologiaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTecnologia() throws Exception {
        // Initialize the database
        tecnologiaRepository.saveAndFlush(tecnologia);

        int databaseSizeBeforeDelete = tecnologiaRepository.findAll().size();

        // Delete the tecnologia
        restTecnologiaMockMvc.perform(delete("/api/tecnologias/{id}", tecnologia.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tecnologia> tecnologiaList = tecnologiaRepository.findAll();
        assertThat(tecnologiaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
