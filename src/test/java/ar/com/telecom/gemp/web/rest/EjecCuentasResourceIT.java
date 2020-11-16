package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.EjecCuentas;
import ar.com.telecom.gemp.repository.EjecCuentasRepository;

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
 * Integration tests for the {@link EjecCuentasResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EjecCuentasResourceIT {

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDO = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDO = "BBBBBBBBBB";

    private static final String DEFAULT_CELULAR = "AAAAAAAAAA";
    private static final String UPDATED_CELULAR = "BBBBBBBBBB";

    private static final String DEFAULT_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_MAIL = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_REPCOM_1 = "AAAAAAAAAA";
    private static final String UPDATED_REPCOM_1 = "BBBBBBBBBB";

    private static final String DEFAULT_REPCOM_2 = "AAAAAAAAAA";
    private static final String UPDATED_REPCOM_2 = "BBBBBBBBBB";

    @Autowired
    private EjecCuentasRepository ejecCuentasRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEjecCuentasMockMvc;

    private EjecCuentas ejecCuentas;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EjecCuentas createEntity(EntityManager em) {
        EjecCuentas ejecCuentas = new EjecCuentas()
            .telefono(DEFAULT_TELEFONO)
            .apellido(DEFAULT_APELLIDO)
            .celular(DEFAULT_CELULAR)
            .mail(DEFAULT_MAIL)
            .nombre(DEFAULT_NOMBRE)
            .repcom1(DEFAULT_REPCOM_1)
            .repcom2(DEFAULT_REPCOM_2);
        return ejecCuentas;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EjecCuentas createUpdatedEntity(EntityManager em) {
        EjecCuentas ejecCuentas = new EjecCuentas()
            .telefono(UPDATED_TELEFONO)
            .apellido(UPDATED_APELLIDO)
            .celular(UPDATED_CELULAR)
            .mail(UPDATED_MAIL)
            .nombre(UPDATED_NOMBRE)
            .repcom1(UPDATED_REPCOM_1)
            .repcom2(UPDATED_REPCOM_2);
        return ejecCuentas;
    }

    @BeforeEach
    public void initTest() {
        ejecCuentas = createEntity(em);
    }

    @Test
    @Transactional
    public void createEjecCuentas() throws Exception {
        int databaseSizeBeforeCreate = ejecCuentasRepository.findAll().size();
        // Create the EjecCuentas
        restEjecCuentasMockMvc.perform(post("/api/ejec-cuentas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ejecCuentas)))
            .andExpect(status().isCreated());

        // Validate the EjecCuentas in the database
        List<EjecCuentas> ejecCuentasList = ejecCuentasRepository.findAll();
        assertThat(ejecCuentasList).hasSize(databaseSizeBeforeCreate + 1);
        EjecCuentas testEjecCuentas = ejecCuentasList.get(ejecCuentasList.size() - 1);
        assertThat(testEjecCuentas.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testEjecCuentas.getApellido()).isEqualTo(DEFAULT_APELLIDO);
        assertThat(testEjecCuentas.getCelular()).isEqualTo(DEFAULT_CELULAR);
        assertThat(testEjecCuentas.getMail()).isEqualTo(DEFAULT_MAIL);
        assertThat(testEjecCuentas.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEjecCuentas.getRepcom1()).isEqualTo(DEFAULT_REPCOM_1);
        assertThat(testEjecCuentas.getRepcom2()).isEqualTo(DEFAULT_REPCOM_2);
    }

    @Test
    @Transactional
    public void createEjecCuentasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ejecCuentasRepository.findAll().size();

        // Create the EjecCuentas with an existing ID
        ejecCuentas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEjecCuentasMockMvc.perform(post("/api/ejec-cuentas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ejecCuentas)))
            .andExpect(status().isBadRequest());

        // Validate the EjecCuentas in the database
        List<EjecCuentas> ejecCuentasList = ejecCuentasRepository.findAll();
        assertThat(ejecCuentasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEjecCuentas() throws Exception {
        // Initialize the database
        ejecCuentasRepository.saveAndFlush(ejecCuentas);

        // Get all the ejecCuentasList
        restEjecCuentasMockMvc.perform(get("/api/ejec-cuentas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ejecCuentas.getId().intValue())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO)))
            .andExpect(jsonPath("$.[*].apellido").value(hasItem(DEFAULT_APELLIDO)))
            .andExpect(jsonPath("$.[*].celular").value(hasItem(DEFAULT_CELULAR)))
            .andExpect(jsonPath("$.[*].mail").value(hasItem(DEFAULT_MAIL)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].repcom1").value(hasItem(DEFAULT_REPCOM_1)))
            .andExpect(jsonPath("$.[*].repcom2").value(hasItem(DEFAULT_REPCOM_2)));
    }
    
    @Test
    @Transactional
    public void getEjecCuentas() throws Exception {
        // Initialize the database
        ejecCuentasRepository.saveAndFlush(ejecCuentas);

        // Get the ejecCuentas
        restEjecCuentasMockMvc.perform(get("/api/ejec-cuentas/{id}", ejecCuentas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ejecCuentas.getId().intValue()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO))
            .andExpect(jsonPath("$.apellido").value(DEFAULT_APELLIDO))
            .andExpect(jsonPath("$.celular").value(DEFAULT_CELULAR))
            .andExpect(jsonPath("$.mail").value(DEFAULT_MAIL))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.repcom1").value(DEFAULT_REPCOM_1))
            .andExpect(jsonPath("$.repcom2").value(DEFAULT_REPCOM_2));
    }
    @Test
    @Transactional
    public void getNonExistingEjecCuentas() throws Exception {
        // Get the ejecCuentas
        restEjecCuentasMockMvc.perform(get("/api/ejec-cuentas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEjecCuentas() throws Exception {
        // Initialize the database
        ejecCuentasRepository.saveAndFlush(ejecCuentas);

        int databaseSizeBeforeUpdate = ejecCuentasRepository.findAll().size();

        // Update the ejecCuentas
        EjecCuentas updatedEjecCuentas = ejecCuentasRepository.findById(ejecCuentas.getId()).get();
        // Disconnect from session so that the updates on updatedEjecCuentas are not directly saved in db
        em.detach(updatedEjecCuentas);
        updatedEjecCuentas
            .telefono(UPDATED_TELEFONO)
            .apellido(UPDATED_APELLIDO)
            .celular(UPDATED_CELULAR)
            .mail(UPDATED_MAIL)
            .nombre(UPDATED_NOMBRE)
            .repcom1(UPDATED_REPCOM_1)
            .repcom2(UPDATED_REPCOM_2);

        restEjecCuentasMockMvc.perform(put("/api/ejec-cuentas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEjecCuentas)))
            .andExpect(status().isOk());

        // Validate the EjecCuentas in the database
        List<EjecCuentas> ejecCuentasList = ejecCuentasRepository.findAll();
        assertThat(ejecCuentasList).hasSize(databaseSizeBeforeUpdate);
        EjecCuentas testEjecCuentas = ejecCuentasList.get(ejecCuentasList.size() - 1);
        assertThat(testEjecCuentas.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testEjecCuentas.getApellido()).isEqualTo(UPDATED_APELLIDO);
        assertThat(testEjecCuentas.getCelular()).isEqualTo(UPDATED_CELULAR);
        assertThat(testEjecCuentas.getMail()).isEqualTo(UPDATED_MAIL);
        assertThat(testEjecCuentas.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEjecCuentas.getRepcom1()).isEqualTo(UPDATED_REPCOM_1);
        assertThat(testEjecCuentas.getRepcom2()).isEqualTo(UPDATED_REPCOM_2);
    }

    @Test
    @Transactional
    public void updateNonExistingEjecCuentas() throws Exception {
        int databaseSizeBeforeUpdate = ejecCuentasRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEjecCuentasMockMvc.perform(put("/api/ejec-cuentas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ejecCuentas)))
            .andExpect(status().isBadRequest());

        // Validate the EjecCuentas in the database
        List<EjecCuentas> ejecCuentasList = ejecCuentasRepository.findAll();
        assertThat(ejecCuentasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEjecCuentas() throws Exception {
        // Initialize the database
        ejecCuentasRepository.saveAndFlush(ejecCuentas);

        int databaseSizeBeforeDelete = ejecCuentasRepository.findAll().size();

        // Delete the ejecCuentas
        restEjecCuentasMockMvc.perform(delete("/api/ejec-cuentas/{id}", ejecCuentas.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EjecCuentas> ejecCuentasList = ejecCuentasRepository.findAll();
        assertThat(ejecCuentasList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
