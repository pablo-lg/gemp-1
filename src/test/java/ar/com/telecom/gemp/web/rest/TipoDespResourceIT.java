package ar.com.telecom.gemp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ar.com.telecom.gemp.IntegrationTest;
import ar.com.telecom.gemp.domain.TipoDesp;
import ar.com.telecom.gemp.repository.TipoDespRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TipoDespResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TipoDespResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_VALOR = "AAAAAAAAAA";
    private static final String UPDATED_VALOR = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tipo-desps";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

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
        TipoDesp tipoDesp = new TipoDesp().descripcion(DEFAULT_DESCRIPCION).valor(DEFAULT_VALOR);
        return tipoDesp;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDesp createUpdatedEntity(EntityManager em) {
        TipoDesp tipoDesp = new TipoDesp().descripcion(UPDATED_DESCRIPCION).valor(UPDATED_VALOR);
        return tipoDesp;
    }

    @BeforeEach
    public void initTest() {
        tipoDesp = createEntity(em);
    }

    @Test
    @Transactional
    void createTipoDesp() throws Exception {
        int databaseSizeBeforeCreate = tipoDespRepository.findAll().size();
        // Create the TipoDesp
        restTipoDespMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoDesp)))
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
    void createTipoDespWithExistingId() throws Exception {
        // Create the TipoDesp with an existing ID
        tipoDesp.setId(1L);

        int databaseSizeBeforeCreate = tipoDespRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoDespMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoDesp)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDesp in the database
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTipoDesps() throws Exception {
        // Initialize the database
        tipoDespRepository.saveAndFlush(tipoDesp);

        // Get all the tipoDespList
        restTipoDespMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoDesp.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)));
    }

    @Test
    @Transactional
    void getTipoDesp() throws Exception {
        // Initialize the database
        tipoDespRepository.saveAndFlush(tipoDesp);

        // Get the tipoDesp
        restTipoDespMockMvc
            .perform(get(ENTITY_API_URL_ID, tipoDesp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoDesp.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR));
    }

    @Test
    @Transactional
    void getNonExistingTipoDesp() throws Exception {
        // Get the tipoDesp
        restTipoDespMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTipoDesp() throws Exception {
        // Initialize the database
        tipoDespRepository.saveAndFlush(tipoDesp);

        int databaseSizeBeforeUpdate = tipoDespRepository.findAll().size();

        // Update the tipoDesp
        TipoDesp updatedTipoDesp = tipoDespRepository.findById(tipoDesp.getId()).get();
        // Disconnect from session so that the updates on updatedTipoDesp are not directly saved in db
        em.detach(updatedTipoDesp);
        updatedTipoDesp.descripcion(UPDATED_DESCRIPCION).valor(UPDATED_VALOR);

        restTipoDespMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTipoDesp.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTipoDesp))
            )
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
    void putNonExistingTipoDesp() throws Exception {
        int databaseSizeBeforeUpdate = tipoDespRepository.findAll().size();
        tipoDesp.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoDespMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tipoDesp.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDesp))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDesp in the database
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTipoDesp() throws Exception {
        int databaseSizeBeforeUpdate = tipoDespRepository.findAll().size();
        tipoDesp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoDespMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDesp))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDesp in the database
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTipoDesp() throws Exception {
        int databaseSizeBeforeUpdate = tipoDespRepository.findAll().size();
        tipoDesp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoDespMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoDesp)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoDesp in the database
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTipoDespWithPatch() throws Exception {
        // Initialize the database
        tipoDespRepository.saveAndFlush(tipoDesp);

        int databaseSizeBeforeUpdate = tipoDespRepository.findAll().size();

        // Update the tipoDesp using partial update
        TipoDesp partialUpdatedTipoDesp = new TipoDesp();
        partialUpdatedTipoDesp.setId(tipoDesp.getId());

        partialUpdatedTipoDesp.descripcion(UPDATED_DESCRIPCION).valor(UPDATED_VALOR);

        restTipoDespMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoDesp.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoDesp))
            )
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
    void fullUpdateTipoDespWithPatch() throws Exception {
        // Initialize the database
        tipoDespRepository.saveAndFlush(tipoDesp);

        int databaseSizeBeforeUpdate = tipoDespRepository.findAll().size();

        // Update the tipoDesp using partial update
        TipoDesp partialUpdatedTipoDesp = new TipoDesp();
        partialUpdatedTipoDesp.setId(tipoDesp.getId());

        partialUpdatedTipoDesp.descripcion(UPDATED_DESCRIPCION).valor(UPDATED_VALOR);

        restTipoDespMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoDesp.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoDesp))
            )
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
    void patchNonExistingTipoDesp() throws Exception {
        int databaseSizeBeforeUpdate = tipoDespRepository.findAll().size();
        tipoDesp.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoDespMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tipoDesp.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoDesp))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDesp in the database
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTipoDesp() throws Exception {
        int databaseSizeBeforeUpdate = tipoDespRepository.findAll().size();
        tipoDesp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoDespMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoDesp))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDesp in the database
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTipoDesp() throws Exception {
        int databaseSizeBeforeUpdate = tipoDespRepository.findAll().size();
        tipoDesp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoDespMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(tipoDesp)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoDesp in the database
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTipoDesp() throws Exception {
        // Initialize the database
        tipoDespRepository.saveAndFlush(tipoDesp);

        int databaseSizeBeforeDelete = tipoDespRepository.findAll().size();

        // Delete the tipoDesp
        restTipoDespMockMvc
            .perform(delete(ENTITY_API_URL_ID, tipoDesp.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoDesp> tipoDespList = tipoDespRepository.findAll();
        assertThat(tipoDespList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
