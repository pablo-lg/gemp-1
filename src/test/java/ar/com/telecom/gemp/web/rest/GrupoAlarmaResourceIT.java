package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.GrupoAlarma;
import ar.com.telecom.gemp.repository.GrupoAlarmaRepository;

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
 * Integration tests for the {@link GrupoAlarmaResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class GrupoAlarmaResourceIT {

    private static final String DEFAULT_NOMBRE_GRUPO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_GRUPO = "BBBBBBBBBB";

    private static final Long DEFAULT_ALARMA_TIEMPO = 1L;
    private static final Long UPDATED_ALARMA_TIEMPO = 2L;

    private static final Long DEFAULT_ALARMA_SVA = 1L;
    private static final Long UPDATED_ALARMA_SVA = 2L;

    private static final Long DEFAULT_ALARMA_BUSINESSCASE = 1L;
    private static final Long UPDATED_ALARMA_BUSINESSCASE = 2L;

    @Autowired
    private GrupoAlarmaRepository grupoAlarmaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGrupoAlarmaMockMvc;

    private GrupoAlarma grupoAlarma;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GrupoAlarma createEntity(EntityManager em) {
        GrupoAlarma grupoAlarma = new GrupoAlarma()
            .nombreGrupo(DEFAULT_NOMBRE_GRUPO)
            .alarmaTiempo(DEFAULT_ALARMA_TIEMPO)
            .alarmaSva(DEFAULT_ALARMA_SVA)
            .alarmaBusinesscase(DEFAULT_ALARMA_BUSINESSCASE);
        return grupoAlarma;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GrupoAlarma createUpdatedEntity(EntityManager em) {
        GrupoAlarma grupoAlarma = new GrupoAlarma()
            .nombreGrupo(UPDATED_NOMBRE_GRUPO)
            .alarmaTiempo(UPDATED_ALARMA_TIEMPO)
            .alarmaSva(UPDATED_ALARMA_SVA)
            .alarmaBusinesscase(UPDATED_ALARMA_BUSINESSCASE);
        return grupoAlarma;
    }

    @BeforeEach
    public void initTest() {
        grupoAlarma = createEntity(em);
    }

    @Test
    @Transactional
    public void createGrupoAlarma() throws Exception {
        int databaseSizeBeforeCreate = grupoAlarmaRepository.findAll().size();
        // Create the GrupoAlarma
        restGrupoAlarmaMockMvc.perform(post("/api/grupo-alarmas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoAlarma)))
            .andExpect(status().isCreated());

        // Validate the GrupoAlarma in the database
        List<GrupoAlarma> grupoAlarmaList = grupoAlarmaRepository.findAll();
        assertThat(grupoAlarmaList).hasSize(databaseSizeBeforeCreate + 1);
        GrupoAlarma testGrupoAlarma = grupoAlarmaList.get(grupoAlarmaList.size() - 1);
        assertThat(testGrupoAlarma.getNombreGrupo()).isEqualTo(DEFAULT_NOMBRE_GRUPO);
        assertThat(testGrupoAlarma.getAlarmaTiempo()).isEqualTo(DEFAULT_ALARMA_TIEMPO);
        assertThat(testGrupoAlarma.getAlarmaSva()).isEqualTo(DEFAULT_ALARMA_SVA);
        assertThat(testGrupoAlarma.getAlarmaBusinesscase()).isEqualTo(DEFAULT_ALARMA_BUSINESSCASE);
    }

    @Test
    @Transactional
    public void createGrupoAlarmaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = grupoAlarmaRepository.findAll().size();

        // Create the GrupoAlarma with an existing ID
        grupoAlarma.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGrupoAlarmaMockMvc.perform(post("/api/grupo-alarmas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoAlarma)))
            .andExpect(status().isBadRequest());

        // Validate the GrupoAlarma in the database
        List<GrupoAlarma> grupoAlarmaList = grupoAlarmaRepository.findAll();
        assertThat(grupoAlarmaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreGrupoIsRequired() throws Exception {
        int databaseSizeBeforeTest = grupoAlarmaRepository.findAll().size();
        // set the field null
        grupoAlarma.setNombreGrupo(null);

        // Create the GrupoAlarma, which fails.


        restGrupoAlarmaMockMvc.perform(post("/api/grupo-alarmas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoAlarma)))
            .andExpect(status().isBadRequest());

        List<GrupoAlarma> grupoAlarmaList = grupoAlarmaRepository.findAll();
        assertThat(grupoAlarmaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGrupoAlarmas() throws Exception {
        // Initialize the database
        grupoAlarmaRepository.saveAndFlush(grupoAlarma);

        // Get all the grupoAlarmaList
        restGrupoAlarmaMockMvc.perform(get("/api/grupo-alarmas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grupoAlarma.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreGrupo").value(hasItem(DEFAULT_NOMBRE_GRUPO)))
            .andExpect(jsonPath("$.[*].alarmaTiempo").value(hasItem(DEFAULT_ALARMA_TIEMPO.intValue())))
            .andExpect(jsonPath("$.[*].alarmaSva").value(hasItem(DEFAULT_ALARMA_SVA.intValue())))
            .andExpect(jsonPath("$.[*].alarmaBusinesscase").value(hasItem(DEFAULT_ALARMA_BUSINESSCASE.intValue())));
    }
    
    @Test
    @Transactional
    public void getGrupoAlarma() throws Exception {
        // Initialize the database
        grupoAlarmaRepository.saveAndFlush(grupoAlarma);

        // Get the grupoAlarma
        restGrupoAlarmaMockMvc.perform(get("/api/grupo-alarmas/{id}", grupoAlarma.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(grupoAlarma.getId().intValue()))
            .andExpect(jsonPath("$.nombreGrupo").value(DEFAULT_NOMBRE_GRUPO))
            .andExpect(jsonPath("$.alarmaTiempo").value(DEFAULT_ALARMA_TIEMPO.intValue()))
            .andExpect(jsonPath("$.alarmaSva").value(DEFAULT_ALARMA_SVA.intValue()))
            .andExpect(jsonPath("$.alarmaBusinesscase").value(DEFAULT_ALARMA_BUSINESSCASE.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingGrupoAlarma() throws Exception {
        // Get the grupoAlarma
        restGrupoAlarmaMockMvc.perform(get("/api/grupo-alarmas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGrupoAlarma() throws Exception {
        // Initialize the database
        grupoAlarmaRepository.saveAndFlush(grupoAlarma);

        int databaseSizeBeforeUpdate = grupoAlarmaRepository.findAll().size();

        // Update the grupoAlarma
        GrupoAlarma updatedGrupoAlarma = grupoAlarmaRepository.findById(grupoAlarma.getId()).get();
        // Disconnect from session so that the updates on updatedGrupoAlarma are not directly saved in db
        em.detach(updatedGrupoAlarma);
        updatedGrupoAlarma
            .nombreGrupo(UPDATED_NOMBRE_GRUPO)
            .alarmaTiempo(UPDATED_ALARMA_TIEMPO)
            .alarmaSva(UPDATED_ALARMA_SVA)
            .alarmaBusinesscase(UPDATED_ALARMA_BUSINESSCASE);

        restGrupoAlarmaMockMvc.perform(put("/api/grupo-alarmas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGrupoAlarma)))
            .andExpect(status().isOk());

        // Validate the GrupoAlarma in the database
        List<GrupoAlarma> grupoAlarmaList = grupoAlarmaRepository.findAll();
        assertThat(grupoAlarmaList).hasSize(databaseSizeBeforeUpdate);
        GrupoAlarma testGrupoAlarma = grupoAlarmaList.get(grupoAlarmaList.size() - 1);
        assertThat(testGrupoAlarma.getNombreGrupo()).isEqualTo(UPDATED_NOMBRE_GRUPO);
        assertThat(testGrupoAlarma.getAlarmaTiempo()).isEqualTo(UPDATED_ALARMA_TIEMPO);
        assertThat(testGrupoAlarma.getAlarmaSva()).isEqualTo(UPDATED_ALARMA_SVA);
        assertThat(testGrupoAlarma.getAlarmaBusinesscase()).isEqualTo(UPDATED_ALARMA_BUSINESSCASE);
    }

    @Test
    @Transactional
    public void updateNonExistingGrupoAlarma() throws Exception {
        int databaseSizeBeforeUpdate = grupoAlarmaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGrupoAlarmaMockMvc.perform(put("/api/grupo-alarmas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoAlarma)))
            .andExpect(status().isBadRequest());

        // Validate the GrupoAlarma in the database
        List<GrupoAlarma> grupoAlarmaList = grupoAlarmaRepository.findAll();
        assertThat(grupoAlarmaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGrupoAlarma() throws Exception {
        // Initialize the database
        grupoAlarmaRepository.saveAndFlush(grupoAlarma);

        int databaseSizeBeforeDelete = grupoAlarmaRepository.findAll().size();

        // Delete the grupoAlarma
        restGrupoAlarmaMockMvc.perform(delete("/api/grupo-alarmas/{id}", grupoAlarma.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GrupoAlarma> grupoAlarmaList = grupoAlarmaRepository.findAll();
        assertThat(grupoAlarmaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
