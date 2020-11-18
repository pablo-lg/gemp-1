package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.NSE;
import ar.com.telecom.gemp.repository.NSERepository;

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
 * Integration tests for the {@link NSEResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class NSEResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVO = false;
    private static final Boolean UPDATED_ACTIVO = true;

    @Autowired
    private NSERepository nSERepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNSEMockMvc;

    private NSE nSE;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NSE createEntity(EntityManager em) {
        NSE nSE = new NSE()
            .descripcion(DEFAULT_DESCRIPCION)
            .activo(DEFAULT_ACTIVO);
        return nSE;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NSE createUpdatedEntity(EntityManager em) {
        NSE nSE = new NSE()
            .descripcion(UPDATED_DESCRIPCION)
            .activo(UPDATED_ACTIVO);
        return nSE;
    }

    @BeforeEach
    public void initTest() {
        nSE = createEntity(em);
    }

    @Test
    @Transactional
    public void createNSE() throws Exception {
        int databaseSizeBeforeCreate = nSERepository.findAll().size();
        // Create the NSE
        restNSEMockMvc.perform(post("/api/nses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nSE)))
            .andExpect(status().isCreated());

        // Validate the NSE in the database
        List<NSE> nSEList = nSERepository.findAll();
        assertThat(nSEList).hasSize(databaseSizeBeforeCreate + 1);
        NSE testNSE = nSEList.get(nSEList.size() - 1);
        assertThat(testNSE.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testNSE.isActivo()).isEqualTo(DEFAULT_ACTIVO);
    }

    @Test
    @Transactional
    public void createNSEWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nSERepository.findAll().size();

        // Create the NSE with an existing ID
        nSE.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNSEMockMvc.perform(post("/api/nses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nSE)))
            .andExpect(status().isBadRequest());

        // Validate the NSE in the database
        List<NSE> nSEList = nSERepository.findAll();
        assertThat(nSEList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNSES() throws Exception {
        // Initialize the database
        nSERepository.saveAndFlush(nSE);

        // Get all the nSEList
        restNSEMockMvc.perform(get("/api/nses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nSE.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].activo").value(hasItem(DEFAULT_ACTIVO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getNSE() throws Exception {
        // Initialize the database
        nSERepository.saveAndFlush(nSE);

        // Get the nSE
        restNSEMockMvc.perform(get("/api/nses/{id}", nSE.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(nSE.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.activo").value(DEFAULT_ACTIVO.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingNSE() throws Exception {
        // Get the nSE
        restNSEMockMvc.perform(get("/api/nses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNSE() throws Exception {
        // Initialize the database
        nSERepository.saveAndFlush(nSE);

        int databaseSizeBeforeUpdate = nSERepository.findAll().size();

        // Update the nSE
        NSE updatedNSE = nSERepository.findById(nSE.getId()).get();
        // Disconnect from session so that the updates on updatedNSE are not directly saved in db
        em.detach(updatedNSE);
        updatedNSE
            .descripcion(UPDATED_DESCRIPCION)
            .activo(UPDATED_ACTIVO);

        restNSEMockMvc.perform(put("/api/nses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNSE)))
            .andExpect(status().isOk());

        // Validate the NSE in the database
        List<NSE> nSEList = nSERepository.findAll();
        assertThat(nSEList).hasSize(databaseSizeBeforeUpdate);
        NSE testNSE = nSEList.get(nSEList.size() - 1);
        assertThat(testNSE.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testNSE.isActivo()).isEqualTo(UPDATED_ACTIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingNSE() throws Exception {
        int databaseSizeBeforeUpdate = nSERepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNSEMockMvc.perform(put("/api/nses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nSE)))
            .andExpect(status().isBadRequest());

        // Validate the NSE in the database
        List<NSE> nSEList = nSERepository.findAll();
        assertThat(nSEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNSE() throws Exception {
        // Initialize the database
        nSERepository.saveAndFlush(nSE);

        int databaseSizeBeforeDelete = nSERepository.findAll().size();

        // Delete the nSE
        restNSEMockMvc.perform(delete("/api/nses/{id}", nSE.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NSE> nSEList = nSERepository.findAll();
        assertThat(nSEList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
