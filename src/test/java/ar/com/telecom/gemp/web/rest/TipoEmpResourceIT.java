package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.TipoEmp;
import ar.com.telecom.gemp.repository.TipoEmpRepository;
import ar.com.telecom.gemp.service.TipoEmpService;
import ar.com.telecom.gemp.service.dto.TipoEmpCriteria;
import ar.com.telecom.gemp.service.TipoEmpQueryService;

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
 * Integration tests for the {@link TipoEmpResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoEmpResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private TipoEmpRepository tipoEmpRepository;

    @Autowired
    private TipoEmpService tipoEmpService;

    @Autowired
    private TipoEmpQueryService tipoEmpQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoEmpMockMvc;

    private TipoEmp tipoEmp;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoEmp createEntity(EntityManager em) {
        TipoEmp tipoEmp = new TipoEmp()
            .descripcion(DEFAULT_DESCRIPCION);
        return tipoEmp;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoEmp createUpdatedEntity(EntityManager em) {
        TipoEmp tipoEmp = new TipoEmp()
            .descripcion(UPDATED_DESCRIPCION);
        return tipoEmp;
    }

    @BeforeEach
    public void initTest() {
        tipoEmp = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoEmp() throws Exception {
        int databaseSizeBeforeCreate = tipoEmpRepository.findAll().size();
        // Create the TipoEmp
        restTipoEmpMockMvc.perform(post("/api/tipo-emps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoEmp)))
            .andExpect(status().isCreated());

        // Validate the TipoEmp in the database
        List<TipoEmp> tipoEmpList = tipoEmpRepository.findAll();
        assertThat(tipoEmpList).hasSize(databaseSizeBeforeCreate + 1);
        TipoEmp testTipoEmp = tipoEmpList.get(tipoEmpList.size() - 1);
        assertThat(testTipoEmp.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createTipoEmpWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoEmpRepository.findAll().size();

        // Create the TipoEmp with an existing ID
        tipoEmp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoEmpMockMvc.perform(post("/api/tipo-emps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoEmp)))
            .andExpect(status().isBadRequest());

        // Validate the TipoEmp in the database
        List<TipoEmp> tipoEmpList = tipoEmpRepository.findAll();
        assertThat(tipoEmpList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoEmps() throws Exception {
        // Initialize the database
        tipoEmpRepository.saveAndFlush(tipoEmp);

        // Get all the tipoEmpList
        restTipoEmpMockMvc.perform(get("/api/tipo-emps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoEmp.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getTipoEmp() throws Exception {
        // Initialize the database
        tipoEmpRepository.saveAndFlush(tipoEmp);

        // Get the tipoEmp
        restTipoEmpMockMvc.perform(get("/api/tipo-emps/{id}", tipoEmp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoEmp.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }


    @Test
    @Transactional
    public void getTipoEmpsByIdFiltering() throws Exception {
        // Initialize the database
        tipoEmpRepository.saveAndFlush(tipoEmp);

        Long id = tipoEmp.getId();

        defaultTipoEmpShouldBeFound("id.equals=" + id);
        defaultTipoEmpShouldNotBeFound("id.notEquals=" + id);

        defaultTipoEmpShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultTipoEmpShouldNotBeFound("id.greaterThan=" + id);

        defaultTipoEmpShouldBeFound("id.lessThanOrEqual=" + id);
        defaultTipoEmpShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllTipoEmpsByDescripcionIsEqualToSomething() throws Exception {
        // Initialize the database
        tipoEmpRepository.saveAndFlush(tipoEmp);

        // Get all the tipoEmpList where descripcion equals to DEFAULT_DESCRIPCION
        defaultTipoEmpShouldBeFound("descripcion.equals=" + DEFAULT_DESCRIPCION);

        // Get all the tipoEmpList where descripcion equals to UPDATED_DESCRIPCION
        defaultTipoEmpShouldNotBeFound("descripcion.equals=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllTipoEmpsByDescripcionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        tipoEmpRepository.saveAndFlush(tipoEmp);

        // Get all the tipoEmpList where descripcion not equals to DEFAULT_DESCRIPCION
        defaultTipoEmpShouldNotBeFound("descripcion.notEquals=" + DEFAULT_DESCRIPCION);

        // Get all the tipoEmpList where descripcion not equals to UPDATED_DESCRIPCION
        defaultTipoEmpShouldBeFound("descripcion.notEquals=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllTipoEmpsByDescripcionIsInShouldWork() throws Exception {
        // Initialize the database
        tipoEmpRepository.saveAndFlush(tipoEmp);

        // Get all the tipoEmpList where descripcion in DEFAULT_DESCRIPCION or UPDATED_DESCRIPCION
        defaultTipoEmpShouldBeFound("descripcion.in=" + DEFAULT_DESCRIPCION + "," + UPDATED_DESCRIPCION);

        // Get all the tipoEmpList where descripcion equals to UPDATED_DESCRIPCION
        defaultTipoEmpShouldNotBeFound("descripcion.in=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllTipoEmpsByDescripcionIsNullOrNotNull() throws Exception {
        // Initialize the database
        tipoEmpRepository.saveAndFlush(tipoEmp);

        // Get all the tipoEmpList where descripcion is not null
        defaultTipoEmpShouldBeFound("descripcion.specified=true");

        // Get all the tipoEmpList where descripcion is null
        defaultTipoEmpShouldNotBeFound("descripcion.specified=false");
    }
                @Test
    @Transactional
    public void getAllTipoEmpsByDescripcionContainsSomething() throws Exception {
        // Initialize the database
        tipoEmpRepository.saveAndFlush(tipoEmp);

        // Get all the tipoEmpList where descripcion contains DEFAULT_DESCRIPCION
        defaultTipoEmpShouldBeFound("descripcion.contains=" + DEFAULT_DESCRIPCION);

        // Get all the tipoEmpList where descripcion contains UPDATED_DESCRIPCION
        defaultTipoEmpShouldNotBeFound("descripcion.contains=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllTipoEmpsByDescripcionNotContainsSomething() throws Exception {
        // Initialize the database
        tipoEmpRepository.saveAndFlush(tipoEmp);

        // Get all the tipoEmpList where descripcion does not contain DEFAULT_DESCRIPCION
        defaultTipoEmpShouldNotBeFound("descripcion.doesNotContain=" + DEFAULT_DESCRIPCION);

        // Get all the tipoEmpList where descripcion does not contain UPDATED_DESCRIPCION
        defaultTipoEmpShouldBeFound("descripcion.doesNotContain=" + UPDATED_DESCRIPCION);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultTipoEmpShouldBeFound(String filter) throws Exception {
        restTipoEmpMockMvc.perform(get("/api/tipo-emps?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoEmp.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));

        // Check, that the count call also returns 1
        restTipoEmpMockMvc.perform(get("/api/tipo-emps/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultTipoEmpShouldNotBeFound(String filter) throws Exception {
        restTipoEmpMockMvc.perform(get("/api/tipo-emps?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restTipoEmpMockMvc.perform(get("/api/tipo-emps/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    public void getNonExistingTipoEmp() throws Exception {
        // Get the tipoEmp
        restTipoEmpMockMvc.perform(get("/api/tipo-emps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoEmp() throws Exception {
        // Initialize the database
        tipoEmpService.save(tipoEmp);

        int databaseSizeBeforeUpdate = tipoEmpRepository.findAll().size();

        // Update the tipoEmp
        TipoEmp updatedTipoEmp = tipoEmpRepository.findById(tipoEmp.getId()).get();
        // Disconnect from session so that the updates on updatedTipoEmp are not directly saved in db
        em.detach(updatedTipoEmp);
        updatedTipoEmp
            .descripcion(UPDATED_DESCRIPCION);

        restTipoEmpMockMvc.perform(put("/api/tipo-emps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoEmp)))
            .andExpect(status().isOk());

        // Validate the TipoEmp in the database
        List<TipoEmp> tipoEmpList = tipoEmpRepository.findAll();
        assertThat(tipoEmpList).hasSize(databaseSizeBeforeUpdate);
        TipoEmp testTipoEmp = tipoEmpList.get(tipoEmpList.size() - 1);
        assertThat(testTipoEmp.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoEmp() throws Exception {
        int databaseSizeBeforeUpdate = tipoEmpRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoEmpMockMvc.perform(put("/api/tipo-emps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoEmp)))
            .andExpect(status().isBadRequest());

        // Validate the TipoEmp in the database
        List<TipoEmp> tipoEmpList = tipoEmpRepository.findAll();
        assertThat(tipoEmpList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoEmp() throws Exception {
        // Initialize the database
        tipoEmpService.save(tipoEmp);

        int databaseSizeBeforeDelete = tipoEmpRepository.findAll().size();

        // Delete the tipoEmp
        restTipoEmpMockMvc.perform(delete("/api/tipo-emps/{id}", tipoEmp.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoEmp> tipoEmpList = tipoEmpRepository.findAll();
        assertThat(tipoEmpList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
