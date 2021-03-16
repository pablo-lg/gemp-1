package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.GrupoEmprendimiento;
import ar.com.telecom.gemp.repository.GrupoEmprendimientoRepository;

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
 * Integration tests for the {@link GrupoEmprendimientoResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class GrupoEmprendimientoResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ES_PROTEGIDO = false;
    private static final Boolean UPDATED_ES_PROTEGIDO = true;

    @Autowired
    private GrupoEmprendimientoRepository grupoEmprendimientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGrupoEmprendimientoMockMvc;

    private GrupoEmprendimiento grupoEmprendimiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GrupoEmprendimiento createEntity(EntityManager em) {
        GrupoEmprendimiento grupoEmprendimiento = new GrupoEmprendimiento()
            .descripcion(DEFAULT_DESCRIPCION)
            .esProtegido(DEFAULT_ES_PROTEGIDO);
        return grupoEmprendimiento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GrupoEmprendimiento createUpdatedEntity(EntityManager em) {
        GrupoEmprendimiento grupoEmprendimiento = new GrupoEmprendimiento()
            .descripcion(UPDATED_DESCRIPCION)
            .esProtegido(UPDATED_ES_PROTEGIDO);
        return grupoEmprendimiento;
    }

    @BeforeEach
    public void initTest() {
        grupoEmprendimiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createGrupoEmprendimiento() throws Exception {
        int databaseSizeBeforeCreate = grupoEmprendimientoRepository.findAll().size();
        // Create the GrupoEmprendimiento
        restGrupoEmprendimientoMockMvc.perform(post("/api/grupo-emprendimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoEmprendimiento)))
            .andExpect(status().isCreated());

        // Validate the GrupoEmprendimiento in the database
        List<GrupoEmprendimiento> grupoEmprendimientoList = grupoEmprendimientoRepository.findAll();
        assertThat(grupoEmprendimientoList).hasSize(databaseSizeBeforeCreate + 1);
        GrupoEmprendimiento testGrupoEmprendimiento = grupoEmprendimientoList.get(grupoEmprendimientoList.size() - 1);
        assertThat(testGrupoEmprendimiento.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testGrupoEmprendimiento.isEsProtegido()).isEqualTo(DEFAULT_ES_PROTEGIDO);
    }

    @Test
    @Transactional
    public void createGrupoEmprendimientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = grupoEmprendimientoRepository.findAll().size();

        // Create the GrupoEmprendimiento with an existing ID
        grupoEmprendimiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGrupoEmprendimientoMockMvc.perform(post("/api/grupo-emprendimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoEmprendimiento)))
            .andExpect(status().isBadRequest());

        // Validate the GrupoEmprendimiento in the database
        List<GrupoEmprendimiento> grupoEmprendimientoList = grupoEmprendimientoRepository.findAll();
        assertThat(grupoEmprendimientoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGrupoEmprendimientos() throws Exception {
        // Initialize the database
        grupoEmprendimientoRepository.saveAndFlush(grupoEmprendimiento);

        // Get all the grupoEmprendimientoList
        restGrupoEmprendimientoMockMvc.perform(get("/api/grupo-emprendimientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grupoEmprendimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].esProtegido").value(hasItem(DEFAULT_ES_PROTEGIDO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getGrupoEmprendimiento() throws Exception {
        // Initialize the database
        grupoEmprendimientoRepository.saveAndFlush(grupoEmprendimiento);

        // Get the grupoEmprendimiento
        restGrupoEmprendimientoMockMvc.perform(get("/api/grupo-emprendimientos/{id}", grupoEmprendimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(grupoEmprendimiento.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.esProtegido").value(DEFAULT_ES_PROTEGIDO.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingGrupoEmprendimiento() throws Exception {
        // Get the grupoEmprendimiento
        restGrupoEmprendimientoMockMvc.perform(get("/api/grupo-emprendimientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGrupoEmprendimiento() throws Exception {
        // Initialize the database
        grupoEmprendimientoRepository.saveAndFlush(grupoEmprendimiento);

        int databaseSizeBeforeUpdate = grupoEmprendimientoRepository.findAll().size();

        // Update the grupoEmprendimiento
        GrupoEmprendimiento updatedGrupoEmprendimiento = grupoEmprendimientoRepository.findById(grupoEmprendimiento.getId()).get();
        // Disconnect from session so that the updates on updatedGrupoEmprendimiento are not directly saved in db
        em.detach(updatedGrupoEmprendimiento);
        updatedGrupoEmprendimiento
            .descripcion(UPDATED_DESCRIPCION)
            .esProtegido(UPDATED_ES_PROTEGIDO);

        restGrupoEmprendimientoMockMvc.perform(put("/api/grupo-emprendimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGrupoEmprendimiento)))
            .andExpect(status().isOk());

        // Validate the GrupoEmprendimiento in the database
        List<GrupoEmprendimiento> grupoEmprendimientoList = grupoEmprendimientoRepository.findAll();
        assertThat(grupoEmprendimientoList).hasSize(databaseSizeBeforeUpdate);
        GrupoEmprendimiento testGrupoEmprendimiento = grupoEmprendimientoList.get(grupoEmprendimientoList.size() - 1);
        assertThat(testGrupoEmprendimiento.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testGrupoEmprendimiento.isEsProtegido()).isEqualTo(UPDATED_ES_PROTEGIDO);
    }

    @Test
    @Transactional
    public void updateNonExistingGrupoEmprendimiento() throws Exception {
        int databaseSizeBeforeUpdate = grupoEmprendimientoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGrupoEmprendimientoMockMvc.perform(put("/api/grupo-emprendimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoEmprendimiento)))
            .andExpect(status().isBadRequest());

        // Validate the GrupoEmprendimiento in the database
        List<GrupoEmprendimiento> grupoEmprendimientoList = grupoEmprendimientoRepository.findAll();
        assertThat(grupoEmprendimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGrupoEmprendimiento() throws Exception {
        // Initialize the database
        grupoEmprendimientoRepository.saveAndFlush(grupoEmprendimiento);

        int databaseSizeBeforeDelete = grupoEmprendimientoRepository.findAll().size();

        // Delete the grupoEmprendimiento
        restGrupoEmprendimientoMockMvc.perform(delete("/api/grupo-emprendimientos/{id}", grupoEmprendimiento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GrupoEmprendimiento> grupoEmprendimientoList = grupoEmprendimientoRepository.findAll();
        assertThat(grupoEmprendimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
