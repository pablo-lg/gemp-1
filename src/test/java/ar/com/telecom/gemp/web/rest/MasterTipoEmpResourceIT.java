package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.MasterTipoEmp;
import ar.com.telecom.gemp.repository.MasterTipoEmpRepository;

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
 * Integration tests for the {@link MasterTipoEmpResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MasterTipoEmpResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_SOBRE_LOTE = "AAAAAAAAAA";
    private static final String UPDATED_SOBRE_LOTE = "BBBBBBBBBB";

    private static final String DEFAULT_SOBRE_VIVIENDA = "AAAAAAAAAA";
    private static final String UPDATED_SOBRE_VIVIENDA = "BBBBBBBBBB";

    @Autowired
    private MasterTipoEmpRepository masterTipoEmpRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMasterTipoEmpMockMvc;

    private MasterTipoEmp masterTipoEmp;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MasterTipoEmp createEntity(EntityManager em) {
        MasterTipoEmp masterTipoEmp = new MasterTipoEmp()
            .descripcion(DEFAULT_DESCRIPCION)
            .sobreLote(DEFAULT_SOBRE_LOTE)
            .sobreVivienda(DEFAULT_SOBRE_VIVIENDA);
        return masterTipoEmp;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MasterTipoEmp createUpdatedEntity(EntityManager em) {
        MasterTipoEmp masterTipoEmp = new MasterTipoEmp()
            .descripcion(UPDATED_DESCRIPCION)
            .sobreLote(UPDATED_SOBRE_LOTE)
            .sobreVivienda(UPDATED_SOBRE_VIVIENDA);
        return masterTipoEmp;
    }

    @BeforeEach
    public void initTest() {
        masterTipoEmp = createEntity(em);
    }

    @Test
    @Transactional
    public void createMasterTipoEmp() throws Exception {
        int databaseSizeBeforeCreate = masterTipoEmpRepository.findAll().size();
        // Create the MasterTipoEmp
        restMasterTipoEmpMockMvc.perform(post("/api/master-tipo-emps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(masterTipoEmp)))
            .andExpect(status().isCreated());

        // Validate the MasterTipoEmp in the database
        List<MasterTipoEmp> masterTipoEmpList = masterTipoEmpRepository.findAll();
        assertThat(masterTipoEmpList).hasSize(databaseSizeBeforeCreate + 1);
        MasterTipoEmp testMasterTipoEmp = masterTipoEmpList.get(masterTipoEmpList.size() - 1);
        assertThat(testMasterTipoEmp.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testMasterTipoEmp.getSobreLote()).isEqualTo(DEFAULT_SOBRE_LOTE);
        assertThat(testMasterTipoEmp.getSobreVivienda()).isEqualTo(DEFAULT_SOBRE_VIVIENDA);
    }

    @Test
    @Transactional
    public void createMasterTipoEmpWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = masterTipoEmpRepository.findAll().size();

        // Create the MasterTipoEmp with an existing ID
        masterTipoEmp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMasterTipoEmpMockMvc.perform(post("/api/master-tipo-emps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(masterTipoEmp)))
            .andExpect(status().isBadRequest());

        // Validate the MasterTipoEmp in the database
        List<MasterTipoEmp> masterTipoEmpList = masterTipoEmpRepository.findAll();
        assertThat(masterTipoEmpList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMasterTipoEmps() throws Exception {
        // Initialize the database
        masterTipoEmpRepository.saveAndFlush(masterTipoEmp);

        // Get all the masterTipoEmpList
        restMasterTipoEmpMockMvc.perform(get("/api/master-tipo-emps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(masterTipoEmp.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].sobreLote").value(hasItem(DEFAULT_SOBRE_LOTE)))
            .andExpect(jsonPath("$.[*].sobreVivienda").value(hasItem(DEFAULT_SOBRE_VIVIENDA)));
    }
    
    @Test
    @Transactional
    public void getMasterTipoEmp() throws Exception {
        // Initialize the database
        masterTipoEmpRepository.saveAndFlush(masterTipoEmp);

        // Get the masterTipoEmp
        restMasterTipoEmpMockMvc.perform(get("/api/master-tipo-emps/{id}", masterTipoEmp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(masterTipoEmp.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.sobreLote").value(DEFAULT_SOBRE_LOTE))
            .andExpect(jsonPath("$.sobreVivienda").value(DEFAULT_SOBRE_VIVIENDA));
    }
    @Test
    @Transactional
    public void getNonExistingMasterTipoEmp() throws Exception {
        // Get the masterTipoEmp
        restMasterTipoEmpMockMvc.perform(get("/api/master-tipo-emps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMasterTipoEmp() throws Exception {
        // Initialize the database
        masterTipoEmpRepository.saveAndFlush(masterTipoEmp);

        int databaseSizeBeforeUpdate = masterTipoEmpRepository.findAll().size();

        // Update the masterTipoEmp
        MasterTipoEmp updatedMasterTipoEmp = masterTipoEmpRepository.findById(masterTipoEmp.getId()).get();
        // Disconnect from session so that the updates on updatedMasterTipoEmp are not directly saved in db
        em.detach(updatedMasterTipoEmp);
        updatedMasterTipoEmp
            .descripcion(UPDATED_DESCRIPCION)
            .sobreLote(UPDATED_SOBRE_LOTE)
            .sobreVivienda(UPDATED_SOBRE_VIVIENDA);

        restMasterTipoEmpMockMvc.perform(put("/api/master-tipo-emps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMasterTipoEmp)))
            .andExpect(status().isOk());

        // Validate the MasterTipoEmp in the database
        List<MasterTipoEmp> masterTipoEmpList = masterTipoEmpRepository.findAll();
        assertThat(masterTipoEmpList).hasSize(databaseSizeBeforeUpdate);
        MasterTipoEmp testMasterTipoEmp = masterTipoEmpList.get(masterTipoEmpList.size() - 1);
        assertThat(testMasterTipoEmp.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testMasterTipoEmp.getSobreLote()).isEqualTo(UPDATED_SOBRE_LOTE);
        assertThat(testMasterTipoEmp.getSobreVivienda()).isEqualTo(UPDATED_SOBRE_VIVIENDA);
    }

    @Test
    @Transactional
    public void updateNonExistingMasterTipoEmp() throws Exception {
        int databaseSizeBeforeUpdate = masterTipoEmpRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMasterTipoEmpMockMvc.perform(put("/api/master-tipo-emps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(masterTipoEmp)))
            .andExpect(status().isBadRequest());

        // Validate the MasterTipoEmp in the database
        List<MasterTipoEmp> masterTipoEmpList = masterTipoEmpRepository.findAll();
        assertThat(masterTipoEmpList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMasterTipoEmp() throws Exception {
        // Initialize the database
        masterTipoEmpRepository.saveAndFlush(masterTipoEmp);

        int databaseSizeBeforeDelete = masterTipoEmpRepository.findAll().size();

        // Delete the masterTipoEmp
        restMasterTipoEmpMockMvc.perform(delete("/api/master-tipo-emps/{id}", masterTipoEmp.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MasterTipoEmp> masterTipoEmpList = masterTipoEmpRepository.findAll();
        assertThat(masterTipoEmpList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
