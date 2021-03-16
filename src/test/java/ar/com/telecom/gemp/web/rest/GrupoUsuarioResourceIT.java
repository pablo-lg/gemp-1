package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.GrupoUsuario;
import ar.com.telecom.gemp.repository.GrupoUsuarioRepository;

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
 * Integration tests for the {@link GrupoUsuarioResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class GrupoUsuarioResourceIT {

    private static final String DEFAULT_USUARIO = "AAAAAAAAAA";
    private static final String UPDATED_USUARIO = "BBBBBBBBBB";

    @Autowired
    private GrupoUsuarioRepository grupoUsuarioRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGrupoUsuarioMockMvc;

    private GrupoUsuario grupoUsuario;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GrupoUsuario createEntity(EntityManager em) {
        GrupoUsuario grupoUsuario = new GrupoUsuario()
            .usuario(DEFAULT_USUARIO);
        return grupoUsuario;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GrupoUsuario createUpdatedEntity(EntityManager em) {
        GrupoUsuario grupoUsuario = new GrupoUsuario()
            .usuario(UPDATED_USUARIO);
        return grupoUsuario;
    }

    @BeforeEach
    public void initTest() {
        grupoUsuario = createEntity(em);
    }

    @Test
    @Transactional
    public void createGrupoUsuario() throws Exception {
        int databaseSizeBeforeCreate = grupoUsuarioRepository.findAll().size();
        // Create the GrupoUsuario
        restGrupoUsuarioMockMvc.perform(post("/api/grupo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoUsuario)))
            .andExpect(status().isCreated());

        // Validate the GrupoUsuario in the database
        List<GrupoUsuario> grupoUsuarioList = grupoUsuarioRepository.findAll();
        assertThat(grupoUsuarioList).hasSize(databaseSizeBeforeCreate + 1);
        GrupoUsuario testGrupoUsuario = grupoUsuarioList.get(grupoUsuarioList.size() - 1);
        assertThat(testGrupoUsuario.getUsuario()).isEqualTo(DEFAULT_USUARIO);
    }

    @Test
    @Transactional
    public void createGrupoUsuarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = grupoUsuarioRepository.findAll().size();

        // Create the GrupoUsuario with an existing ID
        grupoUsuario.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGrupoUsuarioMockMvc.perform(post("/api/grupo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoUsuario)))
            .andExpect(status().isBadRequest());

        // Validate the GrupoUsuario in the database
        List<GrupoUsuario> grupoUsuarioList = grupoUsuarioRepository.findAll();
        assertThat(grupoUsuarioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGrupoUsuarios() throws Exception {
        // Initialize the database
        grupoUsuarioRepository.saveAndFlush(grupoUsuario);

        // Get all the grupoUsuarioList
        restGrupoUsuarioMockMvc.perform(get("/api/grupo-usuarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grupoUsuario.getId().intValue())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO)));
    }
    
    @Test
    @Transactional
    public void getGrupoUsuario() throws Exception {
        // Initialize the database
        grupoUsuarioRepository.saveAndFlush(grupoUsuario);

        // Get the grupoUsuario
        restGrupoUsuarioMockMvc.perform(get("/api/grupo-usuarios/{id}", grupoUsuario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(grupoUsuario.getId().intValue()))
            .andExpect(jsonPath("$.usuario").value(DEFAULT_USUARIO));
    }
    @Test
    @Transactional
    public void getNonExistingGrupoUsuario() throws Exception {
        // Get the grupoUsuario
        restGrupoUsuarioMockMvc.perform(get("/api/grupo-usuarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGrupoUsuario() throws Exception {
        // Initialize the database
        grupoUsuarioRepository.saveAndFlush(grupoUsuario);

        int databaseSizeBeforeUpdate = grupoUsuarioRepository.findAll().size();

        // Update the grupoUsuario
        GrupoUsuario updatedGrupoUsuario = grupoUsuarioRepository.findById(grupoUsuario.getId()).get();
        // Disconnect from session so that the updates on updatedGrupoUsuario are not directly saved in db
        em.detach(updatedGrupoUsuario);
        updatedGrupoUsuario
            .usuario(UPDATED_USUARIO);

        restGrupoUsuarioMockMvc.perform(put("/api/grupo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGrupoUsuario)))
            .andExpect(status().isOk());

        // Validate the GrupoUsuario in the database
        List<GrupoUsuario> grupoUsuarioList = grupoUsuarioRepository.findAll();
        assertThat(grupoUsuarioList).hasSize(databaseSizeBeforeUpdate);
        GrupoUsuario testGrupoUsuario = grupoUsuarioList.get(grupoUsuarioList.size() - 1);
        assertThat(testGrupoUsuario.getUsuario()).isEqualTo(UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void updateNonExistingGrupoUsuario() throws Exception {
        int databaseSizeBeforeUpdate = grupoUsuarioRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGrupoUsuarioMockMvc.perform(put("/api/grupo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grupoUsuario)))
            .andExpect(status().isBadRequest());

        // Validate the GrupoUsuario in the database
        List<GrupoUsuario> grupoUsuarioList = grupoUsuarioRepository.findAll();
        assertThat(grupoUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGrupoUsuario() throws Exception {
        // Initialize the database
        grupoUsuarioRepository.saveAndFlush(grupoUsuario);

        int databaseSizeBeforeDelete = grupoUsuarioRepository.findAll().size();

        // Delete the grupoUsuario
        restGrupoUsuarioMockMvc.perform(delete("/api/grupo-usuarios/{id}", grupoUsuario.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GrupoUsuario> grupoUsuarioList = grupoUsuarioRepository.findAll();
        assertThat(grupoUsuarioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
