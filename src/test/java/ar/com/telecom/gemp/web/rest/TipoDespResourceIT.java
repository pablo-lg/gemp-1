package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.TipoDesp;
import ar.com.telecom.gemp.repository.TipoDespRepository;

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
 * Integration tests for the {@link TipoDespResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoDespResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_VALOR = "AAAAAAAAAA";
    private static final String UPDATED_VALOR = "BBBBBBBBBB";

    @Autowired
    private TipoDespRepository tipoDespRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoDespMockMvc;

    private TipoDesp tipoDesp;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDesp createEntity(EntityManager em) {
        TipoDesp tipoDesp = new TipoDesp()
            .descripcion(DEFAULT_DESCRIPCION)
            .valor(DEFAULT_VALOR);
        return tipoDesp;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDesp createUpdatedEntity(EntityManager em) {
        TipoDesp tipoDesp = new TipoDesp()
            .descripcion(UPDATED_DESCRIPCION)
            .valor(UPDATED_VALOR);
        return tipoDesp;
    }

    @BeforeEach
    public void initTest() {
        tipoDesp = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoDesp() throws Exception {
        int databaseSizeBeforeCreate = tipoDespRepository.findAll().size();
        // Create the TipoDesp
        restTipoDespMockMvc.perform(post("/api/tipo-desps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDesp)))
            .andExpect(status().isCreated());

        // Validate the TipoDesp in the database
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeCreate + 1);
        TipoDesp testTipoDesp = tipoDespList.get(tipoDespList.size() - 1);
        assertThat(testTipoDesp.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testTipoDesp.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    public void createTipoDespWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoDespRepository.findAll().size();

        // Create the TipoDesp with an existing ID
        tipoDesp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoDespMockMvc.perform(post("/api/tipo-desps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDesp)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDesp in the database
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoDesps() throws Exception {
        // Initialize the database
        tipoDespRepository.saveAndFlush(tipoDesp);

        // Get all the tipoDespList
        restTipoDespMockMvc.perform(get("/api/tipo-desps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoDesp.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)));
    }
    
    @Test
    @Transactional
    public void getTipoDesp() throws Exception {
        // Initialize the database
        tipoDespRepository.saveAndFlush(tipoDesp);

        // Get the tipoDesp
        restTipoDespMockMvc.perform(get("/api/tipo-desps/{id}", tipoDesp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoDesp.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR));
    }
    @Test
    @Transactional
    public void getNonExistingTipoDesp() throws Exception {
        // Get the tipoDesp
        restTipoDespMockMvc.perform(get("/api/tipo-desps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoDesp() throws Exception {
        // Initialize the database
        tipoDespRepository.saveAndFlush(tipoDesp);

        int databaseSizeBeforeUpdate = tipoDespRepository.findAll().size();

        // Update the tipoDesp
        TipoDesp updatedTipoDesp = tipoDespRepository.findById(tipoDesp.getId()).get();
        // Disconnect from session so that the updates on updatedTipoDesp are not directly saved in db
        em.detach(updatedTipoDesp);
        updatedTipoDesp
            .descripcion(UPDATED_DESCRIPCION)
            .valor(UPDATED_VALOR);

        restTipoDespMockMvc.perform(put("/api/tipo-desps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoDesp)))
            .andExpect(status().isOk());

        // Validate the TipoDesp in the database
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeUpdate);
        TipoDesp testTipoDesp = tipoDespList.get(tipoDespList.size() - 1);
        assertThat(testTipoDesp.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testTipoDesp.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoDesp() throws Exception {
        int databaseSizeBeforeUpdate = tipoDespRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoDespMockMvc.perform(put("/api/tipo-desps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDesp)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDesp in the database
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoDesp() throws Exception {
        // Initialize the database
        tipoDespRepository.saveAndFlush(tipoDesp);

        int databaseSizeBeforeDelete = tipoDespRepository.findAll().size();

        // Delete the tipoDesp
        restTipoDespMockMvc.perform(delete("/api/tipo-desps/{id}", tipoDesp.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
