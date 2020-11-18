package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.Emprendimiento;
import ar.com.telecom.gemp.repository.EmprendimientoRepository;

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
 * Integration tests for the {@link EmprendimientoResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EmprendimientoResourceIT {

    private static final String DEFAULT_CONTACTO = "AAAAAAAAAA";
    private static final String UPDATED_CONTACTO = "BBBBBBBBBB";

    private static final String DEFAULT_PROVINCIA = "AAAAAAAAAA";
    private static final String UPDATED_PROVINCIA = "BBBBBBBBBB";

    @Autowired
    private EmprendimientoRepository emprendimientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmprendimientoMockMvc;

    private Emprendimiento emprendimiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Emprendimiento createEntity(EntityManager em) {
        Emprendimiento emprendimiento = new Emprendimiento()
            .contacto(DEFAULT_CONTACTO)
            .provincia(DEFAULT_PROVINCIA);
        return emprendimiento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Emprendimiento createUpdatedEntity(EntityManager em) {
        Emprendimiento emprendimiento = new Emprendimiento()
            .contacto(UPDATED_CONTACTO)
            .provincia(UPDATED_PROVINCIA);
        return emprendimiento;
    }

    @BeforeEach
    public void initTest() {
        emprendimiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmprendimiento() throws Exception {
        int databaseSizeBeforeCreate = emprendimientoRepository.findAll().size();
        // Create the Emprendimiento
        restEmprendimientoMockMvc.perform(post("/api/emprendimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emprendimiento)))
            .andExpect(status().isCreated());

        // Validate the Emprendimiento in the database
        List<Emprendimiento> emprendimientoList = emprendimientoRepository.findAll();
        assertThat(emprendimientoList).hasSize(databaseSizeBeforeCreate + 1);
        Emprendimiento testEmprendimiento = emprendimientoList.get(emprendimientoList.size() - 1);
        assertThat(testEmprendimiento.getContacto()).isEqualTo(DEFAULT_CONTACTO);
        assertThat(testEmprendimiento.getProvincia()).isEqualTo(DEFAULT_PROVINCIA);
    }

    @Test
    @Transactional
    public void createEmprendimientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emprendimientoRepository.findAll().size();

        // Create the Emprendimiento with an existing ID
        emprendimiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmprendimientoMockMvc.perform(post("/api/emprendimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emprendimiento)))
            .andExpect(status().isBadRequest());

        // Validate the Emprendimiento in the database
        List<Emprendimiento> emprendimientoList = emprendimientoRepository.findAll();
        assertThat(emprendimientoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEmprendimientos() throws Exception {
        // Initialize the database
        emprendimientoRepository.saveAndFlush(emprendimiento);

        // Get all the emprendimientoList
        restEmprendimientoMockMvc.perform(get("/api/emprendimientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emprendimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].contacto").value(hasItem(DEFAULT_CONTACTO)))
            .andExpect(jsonPath("$.[*].provincia").value(hasItem(DEFAULT_PROVINCIA)));
    }
    
    @Test
    @Transactional
    public void getEmprendimiento() throws Exception {
        // Initialize the database
        emprendimientoRepository.saveAndFlush(emprendimiento);

        // Get the emprendimiento
        restEmprendimientoMockMvc.perform(get("/api/emprendimientos/{id}", emprendimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(emprendimiento.getId().intValue()))
            .andExpect(jsonPath("$.contacto").value(DEFAULT_CONTACTO))
            .andExpect(jsonPath("$.provincia").value(DEFAULT_PROVINCIA));
    }
    @Test
    @Transactional
    public void getNonExistingEmprendimiento() throws Exception {
        // Get the emprendimiento
        restEmprendimientoMockMvc.perform(get("/api/emprendimientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmprendimiento() throws Exception {
        // Initialize the database
        emprendimientoRepository.saveAndFlush(emprendimiento);

        int databaseSizeBeforeUpdate = emprendimientoRepository.findAll().size();

        // Update the emprendimiento
        Emprendimiento updatedEmprendimiento = emprendimientoRepository.findById(emprendimiento.getId()).get();
        // Disconnect from session so that the updates on updatedEmprendimiento are not directly saved in db
        em.detach(updatedEmprendimiento);
        updatedEmprendimiento
            .contacto(UPDATED_CONTACTO)
            .provincia(UPDATED_PROVINCIA);

        restEmprendimientoMockMvc.perform(put("/api/emprendimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmprendimiento)))
            .andExpect(status().isOk());

        // Validate the Emprendimiento in the database
        List<Emprendimiento> emprendimientoList = emprendimientoRepository.findAll();
        assertThat(emprendimientoList).hasSize(databaseSizeBeforeUpdate);
        Emprendimiento testEmprendimiento = emprendimientoList.get(emprendimientoList.size() - 1);
        assertThat(testEmprendimiento.getContacto()).isEqualTo(UPDATED_CONTACTO);
        assertThat(testEmprendimiento.getProvincia()).isEqualTo(UPDATED_PROVINCIA);
    }

    @Test
    @Transactional
    public void updateNonExistingEmprendimiento() throws Exception {
        int databaseSizeBeforeUpdate = emprendimientoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmprendimientoMockMvc.perform(put("/api/emprendimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emprendimiento)))
            .andExpect(status().isBadRequest());

        // Validate the Emprendimiento in the database
        List<Emprendimiento> emprendimientoList = emprendimientoRepository.findAll();
        assertThat(emprendimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmprendimiento() throws Exception {
        // Initialize the database
        emprendimientoRepository.saveAndFlush(emprendimiento);

        int databaseSizeBeforeDelete = emprendimientoRepository.findAll().size();

        // Delete the emprendimiento
        restEmprendimientoMockMvc.perform(delete("/api/emprendimientos/{id}", emprendimiento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Emprendimiento> emprendimientoList = emprendimientoRepository.findAll();
        assertThat(emprendimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
