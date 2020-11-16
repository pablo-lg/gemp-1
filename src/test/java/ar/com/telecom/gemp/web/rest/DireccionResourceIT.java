package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.GempApp;
import ar.com.telecom.gemp.domain.Direccion;
import ar.com.telecom.gemp.repository.DireccionRepository;

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
 * Integration tests for the {@link DireccionResource} REST controller.
 */
@SpringBootTest(classes = GempApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DireccionResourceIT {

    private static final String DEFAULT_PAIS = "AAAAAAAAAA";
    private static final String UPDATED_PAIS = "BBBBBBBBBB";

    private static final String DEFAULT_PROVINCIA = "AAAAAAAAAA";
    private static final String UPDATED_PROVINCIA = "BBBBBBBBBB";

    private static final String DEFAULT_PARTIDO = "AAAAAAAAAA";
    private static final String UPDATED_PARTIDO = "BBBBBBBBBB";

    private static final String DEFAULT_LOCALIDAD = "AAAAAAAAAA";
    private static final String UPDATED_LOCALIDAD = "BBBBBBBBBB";

    private static final String DEFAULT_CALLE = "AAAAAAAAAA";
    private static final String UPDATED_CALLE = "BBBBBBBBBB";

    private static final Long DEFAULT_ALTURA = 1L;
    private static final Long UPDATED_ALTURA = 2L;

    private static final String DEFAULT_REGION = "AAAAAAAAAA";
    private static final String UPDATED_REGION = "BBBBBBBBBB";

    private static final String DEFAULT_SUBREGION = "AAAAAAAAAA";
    private static final String UPDATED_SUBREGION = "BBBBBBBBBB";

    private static final String DEFAULT_HUB = "AAAAAAAAAA";
    private static final String UPDATED_HUB = "BBBBBBBBBB";

    private static final String DEFAULT_BARRIOS_ESPECIALES = "AAAAAAAAAA";
    private static final String UPDATED_BARRIOS_ESPECIALES = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO_POSTAL = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_POSTAL = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO_CALLE = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_CALLE = "BBBBBBBBBB";

    @Autowired
    private DireccionRepository direccionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDireccionMockMvc;

    private Direccion direccion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Direccion createEntity(EntityManager em) {
        Direccion direccion = new Direccion()
            .pais(DEFAULT_PAIS)
            .provincia(DEFAULT_PROVINCIA)
            .partido(DEFAULT_PARTIDO)
            .localidad(DEFAULT_LOCALIDAD)
            .calle(DEFAULT_CALLE)
            .altura(DEFAULT_ALTURA)
            .region(DEFAULT_REGION)
            .subregion(DEFAULT_SUBREGION)
            .hub(DEFAULT_HUB)
            .barriosEspeciales(DEFAULT_BARRIOS_ESPECIALES)
            .codigoPostal(DEFAULT_CODIGO_POSTAL)
            .tipoCalle(DEFAULT_TIPO_CALLE);
        return direccion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Direccion createUpdatedEntity(EntityManager em) {
        Direccion direccion = new Direccion()
            .pais(UPDATED_PAIS)
            .provincia(UPDATED_PROVINCIA)
            .partido(UPDATED_PARTIDO)
            .localidad(UPDATED_LOCALIDAD)
            .calle(UPDATED_CALLE)
            .altura(UPDATED_ALTURA)
            .region(UPDATED_REGION)
            .subregion(UPDATED_SUBREGION)
            .hub(UPDATED_HUB)
            .barriosEspeciales(UPDATED_BARRIOS_ESPECIALES)
            .codigoPostal(UPDATED_CODIGO_POSTAL)
            .tipoCalle(UPDATED_TIPO_CALLE);
        return direccion;
    }

    @BeforeEach
    public void initTest() {
        direccion = createEntity(em);
    }

    @Test
    @Transactional
    public void createDireccion() throws Exception {
        int databaseSizeBeforeCreate = direccionRepository.findAll().size();
        // Create the Direccion
        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isCreated());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeCreate + 1);
        Direccion testDireccion = direccionList.get(direccionList.size() - 1);
        assertThat(testDireccion.getPais()).isEqualTo(DEFAULT_PAIS);
        assertThat(testDireccion.getProvincia()).isEqualTo(DEFAULT_PROVINCIA);
        assertThat(testDireccion.getPartido()).isEqualTo(DEFAULT_PARTIDO);
        assertThat(testDireccion.getLocalidad()).isEqualTo(DEFAULT_LOCALIDAD);
        assertThat(testDireccion.getCalle()).isEqualTo(DEFAULT_CALLE);
        assertThat(testDireccion.getAltura()).isEqualTo(DEFAULT_ALTURA);
        assertThat(testDireccion.getRegion()).isEqualTo(DEFAULT_REGION);
        assertThat(testDireccion.getSubregion()).isEqualTo(DEFAULT_SUBREGION);
        assertThat(testDireccion.getHub()).isEqualTo(DEFAULT_HUB);
        assertThat(testDireccion.getBarriosEspeciales()).isEqualTo(DEFAULT_BARRIOS_ESPECIALES);
        assertThat(testDireccion.getCodigoPostal()).isEqualTo(DEFAULT_CODIGO_POSTAL);
        assertThat(testDireccion.getTipoCalle()).isEqualTo(DEFAULT_TIPO_CALLE);
    }

    @Test
    @Transactional
    public void createDireccionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = direccionRepository.findAll().size();

        // Create the Direccion with an existing ID
        direccion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDireccions() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);

        // Get all the direccionList
        restDireccionMockMvc.perform(get("/api/direccions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(direccion.getId().intValue())))
            .andExpect(jsonPath("$.[*].pais").value(hasItem(DEFAULT_PAIS)))
            .andExpect(jsonPath("$.[*].provincia").value(hasItem(DEFAULT_PROVINCIA)))
            .andExpect(jsonPath("$.[*].partido").value(hasItem(DEFAULT_PARTIDO)))
            .andExpect(jsonPath("$.[*].localidad").value(hasItem(DEFAULT_LOCALIDAD)))
            .andExpect(jsonPath("$.[*].calle").value(hasItem(DEFAULT_CALLE)))
            .andExpect(jsonPath("$.[*].altura").value(hasItem(DEFAULT_ALTURA.intValue())))
            .andExpect(jsonPath("$.[*].region").value(hasItem(DEFAULT_REGION)))
            .andExpect(jsonPath("$.[*].subregion").value(hasItem(DEFAULT_SUBREGION)))
            .andExpect(jsonPath("$.[*].hub").value(hasItem(DEFAULT_HUB)))
            .andExpect(jsonPath("$.[*].barriosEspeciales").value(hasItem(DEFAULT_BARRIOS_ESPECIALES)))
            .andExpect(jsonPath("$.[*].codigoPostal").value(hasItem(DEFAULT_CODIGO_POSTAL)))
            .andExpect(jsonPath("$.[*].tipoCalle").value(hasItem(DEFAULT_TIPO_CALLE)));
    }
    
    @Test
    @Transactional
    public void getDireccion() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);

        // Get the direccion
        restDireccionMockMvc.perform(get("/api/direccions/{id}", direccion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(direccion.getId().intValue()))
            .andExpect(jsonPath("$.pais").value(DEFAULT_PAIS))
            .andExpect(jsonPath("$.provincia").value(DEFAULT_PROVINCIA))
            .andExpect(jsonPath("$.partido").value(DEFAULT_PARTIDO))
            .andExpect(jsonPath("$.localidad").value(DEFAULT_LOCALIDAD))
            .andExpect(jsonPath("$.calle").value(DEFAULT_CALLE))
            .andExpect(jsonPath("$.altura").value(DEFAULT_ALTURA.intValue()))
            .andExpect(jsonPath("$.region").value(DEFAULT_REGION))
            .andExpect(jsonPath("$.subregion").value(DEFAULT_SUBREGION))
            .andExpect(jsonPath("$.hub").value(DEFAULT_HUB))
            .andExpect(jsonPath("$.barriosEspeciales").value(DEFAULT_BARRIOS_ESPECIALES))
            .andExpect(jsonPath("$.codigoPostal").value(DEFAULT_CODIGO_POSTAL))
            .andExpect(jsonPath("$.tipoCalle").value(DEFAULT_TIPO_CALLE));
    }
    @Test
    @Transactional
    public void getNonExistingDireccion() throws Exception {
        // Get the direccion
        restDireccionMockMvc.perform(get("/api/direccions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDireccion() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);

        int databaseSizeBeforeUpdate = direccionRepository.findAll().size();

        // Update the direccion
        Direccion updatedDireccion = direccionRepository.findById(direccion.getId()).get();
        // Disconnect from session so that the updates on updatedDireccion are not directly saved in db
        em.detach(updatedDireccion);
        updatedDireccion
            .pais(UPDATED_PAIS)
            .provincia(UPDATED_PROVINCIA)
            .partido(UPDATED_PARTIDO)
            .localidad(UPDATED_LOCALIDAD)
            .calle(UPDATED_CALLE)
            .altura(UPDATED_ALTURA)
            .region(UPDATED_REGION)
            .subregion(UPDATED_SUBREGION)
            .hub(UPDATED_HUB)
            .barriosEspeciales(UPDATED_BARRIOS_ESPECIALES)
            .codigoPostal(UPDATED_CODIGO_POSTAL)
            .tipoCalle(UPDATED_TIPO_CALLE);

        restDireccionMockMvc.perform(put("/api/direccions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDireccion)))
            .andExpect(status().isOk());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeUpdate);
        Direccion testDireccion = direccionList.get(direccionList.size() - 1);
        assertThat(testDireccion.getPais()).isEqualTo(UPDATED_PAIS);
        assertThat(testDireccion.getProvincia()).isEqualTo(UPDATED_PROVINCIA);
        assertThat(testDireccion.getPartido()).isEqualTo(UPDATED_PARTIDO);
        assertThat(testDireccion.getLocalidad()).isEqualTo(UPDATED_LOCALIDAD);
        assertThat(testDireccion.getCalle()).isEqualTo(UPDATED_CALLE);
        assertThat(testDireccion.getAltura()).isEqualTo(UPDATED_ALTURA);
        assertThat(testDireccion.getRegion()).isEqualTo(UPDATED_REGION);
        assertThat(testDireccion.getSubregion()).isEqualTo(UPDATED_SUBREGION);
        assertThat(testDireccion.getHub()).isEqualTo(UPDATED_HUB);
        assertThat(testDireccion.getBarriosEspeciales()).isEqualTo(UPDATED_BARRIOS_ESPECIALES);
        assertThat(testDireccion.getCodigoPostal()).isEqualTo(UPDATED_CODIGO_POSTAL);
        assertThat(testDireccion.getTipoCalle()).isEqualTo(UPDATED_TIPO_CALLE);
    }

    @Test
    @Transactional
    public void updateNonExistingDireccion() throws Exception {
        int databaseSizeBeforeUpdate = direccionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDireccionMockMvc.perform(put("/api/direccions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDireccion() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);

        int databaseSizeBeforeDelete = direccionRepository.findAll().size();

        // Delete the direccion
        restDireccionMockMvc.perform(delete("/api/direccions/{id}", direccion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
