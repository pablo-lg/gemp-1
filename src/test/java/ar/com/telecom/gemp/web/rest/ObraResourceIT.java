package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.Obra;
import ar.com.telecom.gemp.repository.ObraRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ObraResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ObraResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_HABILITADA = false;
    private static final Boolean UPDATED_HABILITADA = true;

    private static final LocalDate DEFAULT_FECHA_FIN_OBRA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_FIN_OBRA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ObraRepository obraRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restObraMockMvc;

    private Obra obra;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Obra createEntity(EntityManager em) {
        Obra obra = new Obra()
            .descripcion(DEFAULT_DESCRIPCION)
            .habilitada(DEFAULT_HABILITADA)
            .fechaFinObra(DEFAULT_FECHA_FIN_OBRA);
        return obra;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Obra createUpdatedEntity(EntityManager em) {
        Obra obra = new Obra()
            .descripcion(UPDATED_DESCRIPCION)
            .habilitada(UPDATED_HABILITADA)
            .fechaFinObra(UPDATED_FECHA_FIN_OBRA);
        return obra;
    }

    @BeforeEach
    public void initTest() {
        obra = createEntity(em);
    }

    @Test
    @Transactional
    public void createObra() throws Exception {
        int databaseSizeBeforeCreate = obraRepository.findAll().size();
        // Create the Obra
        restObraMockMvc.perform(post("/api/obras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(obra)))
            .andExpect(status().isCreated());

        // Validate the Obra in the database
        List<Obra> obraList = obraRepository.findAll();
        assertThat(obraList).hasSize(databaseSizeBeforeCreate + 1);
        Obra testObra = obraList.get(obraList.size() - 1);
        assertThat(testObra.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testObra.isHabilitada()).isEqualTo(DEFAULT_HABILITADA);
        assertThat(testObra.getFechaFinObra()).isEqualTo(DEFAULT_FECHA_FIN_OBRA);
    }

    @Test
    @Transactional
    public void createObraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = obraRepository.findAll().size();

        // Create the Obra with an existing ID
        obra.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restObraMockMvc.perform(post("/api/obras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(obra)))
            .andExpect(status().isBadRequest());

        // Validate the Obra in the database
        List<Obra> obraList = obraRepository.findAll();
        assertThat(obraList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllObras() throws Exception {
        // Initialize the database
        obraRepository.saveAndFlush(obra);

        // Get all the obraList
        restObraMockMvc.perform(get("/api/obras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(obra.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].habilitada").value(hasItem(DEFAULT_HABILITADA.booleanValue())))
            .andExpect(jsonPath("$.[*].fechaFinObra").value(hasItem(DEFAULT_FECHA_FIN_OBRA.toString())));
    }
    
    @Test
    @Transactional
    public void getObra() throws Exception {
        // Initialize the database
        obraRepository.saveAndFlush(obra);

        // Get the obra
        restObraMockMvc.perform(get("/api/obras/{id}", obra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(obra.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.habilitada").value(DEFAULT_HABILITADA.booleanValue()))
            .andExpect(jsonPath("$.fechaFinObra").value(DEFAULT_FECHA_FIN_OBRA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingObra() throws Exception {
        // Get the obra
        restObraMockMvc.perform(get("/api/obras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateObra() throws Exception {
        // Initialize the database
        obraRepository.saveAndFlush(obra);

        int databaseSizeBeforeUpdate = obraRepository.findAll().size();

        // Update the obra
        Obra updatedObra = obraRepository.findById(obra.getId()).get();
        // Disconnect from session so that the updates on updatedObra are not directly saved in db
        em.detach(updatedObra);
        updatedObra
            .descripcion(UPDATED_DESCRIPCION)
            .habilitada(UPDATED_HABILITADA)
            .fechaFinObra(UPDATED_FECHA_FIN_OBRA);

        restObraMockMvc.perform(put("/api/obras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedObra)))
            .andExpect(status().isOk());

        // Validate the Obra in the database
        List<Obra> obraList = obraRepository.findAll();
        assertThat(obraList).hasSize(databaseSizeBeforeUpdate);
        Obra testObra = obraList.get(obraList.size() - 1);
        assertThat(testObra.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testObra.isHabilitada()).isEqualTo(UPDATED_HABILITADA);
        assertThat(testObra.getFechaFinObra()).isEqualTo(UPDATED_FECHA_FIN_OBRA);
    }

    @Test
    @Transactional
    public void updateNonExistingObra() throws Exception {
        int databaseSizeBeforeUpdate = obraRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restObraMockMvc.perform(put("/api/obras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(obra)))
            .andExpect(status().isBadRequest());

        // Validate the Obra in the database
        List<Obra> obraList = obraRepository.findAll();
        assertThat(obraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteObra() throws Exception {
        // Initialize the database
        obraRepository.saveAndFlush(obra);

        int databaseSizeBeforeDelete = obraRepository.findAll().size();

        // Delete the obra
        restObraMockMvc.perform(delete("/api/obras/{id}", obra.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Obra> obraList = obraRepository.findAll();
        assertThat(obraList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
