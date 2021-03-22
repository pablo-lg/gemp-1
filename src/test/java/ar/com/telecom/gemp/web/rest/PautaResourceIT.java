package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.Pauta;
import ar.com.telecom.gemp.repository.PautaRepository;

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
 * Integration tests for the {@link PautaResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PautaResourceIT {

    private static final Long DEFAULT_ANIOS = 1L;
    private static final Long UPDATED_ANIOS = 2L;

    private static final String DEFAULT_TIPO_PAUTA = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_PAUTA = "BBBBBBBBBB";

    @Autowired
    private PautaRepository pautaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPautaMockMvc;

    private Pauta pauta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pauta createEntity(EntityManager em) {
        Pauta pauta = new Pauta()
            .anios(DEFAULT_ANIOS)
            .tipoPauta(DEFAULT_TIPO_PAUTA);
        return pauta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pauta createUpdatedEntity(EntityManager em) {
        Pauta pauta = new Pauta()
            .anios(UPDATED_ANIOS)
            .tipoPauta(UPDATED_TIPO_PAUTA);
        return pauta;
    }

    @BeforeEach
    public void initTest() {
        pauta = createEntity(em);
    }

    @Test
    @Transactional
    public void createPauta() throws Exception {
        int databaseSizeBeforeCreate = pautaRepository.findAll().size();
        // Create the Pauta
        restPautaMockMvc.perform(post("/api/pautas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pauta)))
            .andExpect(status().isCreated());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeCreate + 1);
        Pauta testPauta = pautaList.get(pautaList.size() - 1);
        assertThat(testPauta.getAnios()).isEqualTo(DEFAULT_ANIOS);
        assertThat(testPauta.getTipoPauta()).isEqualTo(DEFAULT_TIPO_PAUTA);
    }

    @Test
    @Transactional
    public void createPautaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pautaRepository.findAll().size();

        // Create the Pauta with an existing ID
        pauta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPautaMockMvc.perform(post("/api/pautas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pauta)))
            .andExpect(status().isBadRequest());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPautas() throws Exception {
        // Initialize the database
        pautaRepository.saveAndFlush(pauta);

        // Get all the pautaList
        restPautaMockMvc.perform(get("/api/pautas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pauta.getId().intValue())))
            .andExpect(jsonPath("$.[*].anios").value(hasItem(DEFAULT_ANIOS.intValue())))
            .andExpect(jsonPath("$.[*].tipoPauta").value(hasItem(DEFAULT_TIPO_PAUTA)));
    }
    
    @Test
    @Transactional
    public void getPauta() throws Exception {
        // Initialize the database
        pautaRepository.saveAndFlush(pauta);

        // Get the pauta
        restPautaMockMvc.perform(get("/api/pautas/{id}", pauta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pauta.getId().intValue()))
            .andExpect(jsonPath("$.anios").value(DEFAULT_ANIOS.intValue()))
            .andExpect(jsonPath("$.tipoPauta").value(DEFAULT_TIPO_PAUTA));
    }
    @Test
    @Transactional
    public void getNonExistingPauta() throws Exception {
        // Get the pauta
        restPautaMockMvc.perform(get("/api/pautas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePauta() throws Exception {
        // Initialize the database
        pautaRepository.saveAndFlush(pauta);

        int databaseSizeBeforeUpdate = pautaRepository.findAll().size();

        // Update the pauta
        Pauta updatedPauta = pautaRepository.findById(pauta.getId()).get();
        // Disconnect from session so that the updates on updatedPauta are not directly saved in db
        em.detach(updatedPauta);
        updatedPauta
            .anios(UPDATED_ANIOS)
            .tipoPauta(UPDATED_TIPO_PAUTA);

        restPautaMockMvc.perform(put("/api/pautas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPauta)))
            .andExpect(status().isOk());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeUpdate);
        Pauta testPauta = pautaList.get(pautaList.size() - 1);
        assertThat(testPauta.getAnios()).isEqualTo(UPDATED_ANIOS);
        assertThat(testPauta.getTipoPauta()).isEqualTo(UPDATED_TIPO_PAUTA);
    }

    @Test
    @Transactional
    public void updateNonExistingPauta() throws Exception {
        int databaseSizeBeforeUpdate = pautaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPautaMockMvc.perform(put("/api/pautas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pauta)))
            .andExpect(status().isBadRequest());

        // Validate the Pauta in the database
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePauta() throws Exception {
        // Initialize the database
        pautaRepository.saveAndFlush(pauta);

        int databaseSizeBeforeDelete = pautaRepository.findAll().size();

        // Delete the pauta
        restPautaMockMvc.perform(delete("/api/pautas/{id}", pauta.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pauta> pautaList = pautaRepository.findAll();
        assertThat(pautaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
