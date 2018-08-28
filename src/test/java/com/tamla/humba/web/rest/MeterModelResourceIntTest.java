package com.tamla.humba.web.rest;

import com.tamla.humba.HumbaApp;

import com.tamla.humba.domain.MeterModel;
import com.tamla.humba.repository.MeterModelRepository;
import com.tamla.humba.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.tamla.humba.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MeterModelResource REST controller.
 *
 * @see MeterModelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HumbaApp.class)
public class MeterModelResourceIntTest {

    private static final String DEFAULT_METER_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_METER_MODEL = "BBBBBBBBBB";

    @Autowired
    private MeterModelRepository meterModelRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMeterModelMockMvc;

    private MeterModel meterModel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MeterModelResource meterModelResource = new MeterModelResource(meterModelRepository);
        this.restMeterModelMockMvc = MockMvcBuilders.standaloneSetup(meterModelResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeterModel createEntity(EntityManager em) {
        MeterModel meterModel = new MeterModel()
            .meterModel(DEFAULT_METER_MODEL);
        return meterModel;
    }

    @Before
    public void initTest() {
        meterModel = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeterModel() throws Exception {
        int databaseSizeBeforeCreate = meterModelRepository.findAll().size();

        // Create the MeterModel
        restMeterModelMockMvc.perform(post("/api/meter-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meterModel)))
            .andExpect(status().isCreated());

        // Validate the MeterModel in the database
        List<MeterModel> meterModelList = meterModelRepository.findAll();
        assertThat(meterModelList).hasSize(databaseSizeBeforeCreate + 1);
        MeterModel testMeterModel = meterModelList.get(meterModelList.size() - 1);
        assertThat(testMeterModel.getMeterModel()).isEqualTo(DEFAULT_METER_MODEL);
    }

    @Test
    @Transactional
    public void createMeterModelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = meterModelRepository.findAll().size();

        // Create the MeterModel with an existing ID
        meterModel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeterModelMockMvc.perform(post("/api/meter-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meterModel)))
            .andExpect(status().isBadRequest());

        // Validate the MeterModel in the database
        List<MeterModel> meterModelList = meterModelRepository.findAll();
        assertThat(meterModelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkMeterModelIsRequired() throws Exception {
        int databaseSizeBeforeTest = meterModelRepository.findAll().size();
        // set the field null
        meterModel.setMeterModel(null);

        // Create the MeterModel, which fails.

        restMeterModelMockMvc.perform(post("/api/meter-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meterModel)))
            .andExpect(status().isBadRequest());

        List<MeterModel> meterModelList = meterModelRepository.findAll();
        assertThat(meterModelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMeterModels() throws Exception {
        // Initialize the database
        meterModelRepository.saveAndFlush(meterModel);

        // Get all the meterModelList
        restMeterModelMockMvc.perform(get("/api/meter-models?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(meterModel.getId().intValue())))
            .andExpect(jsonPath("$.[*].meterModel").value(hasItem(DEFAULT_METER_MODEL.toString())));
    }
    

    @Test
    @Transactional
    public void getMeterModel() throws Exception {
        // Initialize the database
        meterModelRepository.saveAndFlush(meterModel);

        // Get the meterModel
        restMeterModelMockMvc.perform(get("/api/meter-models/{id}", meterModel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(meterModel.getId().intValue()))
            .andExpect(jsonPath("$.meterModel").value(DEFAULT_METER_MODEL.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMeterModel() throws Exception {
        // Get the meterModel
        restMeterModelMockMvc.perform(get("/api/meter-models/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeterModel() throws Exception {
        // Initialize the database
        meterModelRepository.saveAndFlush(meterModel);

        int databaseSizeBeforeUpdate = meterModelRepository.findAll().size();

        // Update the meterModel
        MeterModel updatedMeterModel = meterModelRepository.findById(meterModel.getId()).get();
        // Disconnect from session so that the updates on updatedMeterModel are not directly saved in db
        em.detach(updatedMeterModel);
        updatedMeterModel
            .meterModel(UPDATED_METER_MODEL);

        restMeterModelMockMvc.perform(put("/api/meter-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeterModel)))
            .andExpect(status().isOk());

        // Validate the MeterModel in the database
        List<MeterModel> meterModelList = meterModelRepository.findAll();
        assertThat(meterModelList).hasSize(databaseSizeBeforeUpdate);
        MeterModel testMeterModel = meterModelList.get(meterModelList.size() - 1);
        assertThat(testMeterModel.getMeterModel()).isEqualTo(UPDATED_METER_MODEL);
    }

    @Test
    @Transactional
    public void updateNonExistingMeterModel() throws Exception {
        int databaseSizeBeforeUpdate = meterModelRepository.findAll().size();

        // Create the MeterModel

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMeterModelMockMvc.perform(put("/api/meter-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meterModel)))
            .andExpect(status().isBadRequest());

        // Validate the MeterModel in the database
        List<MeterModel> meterModelList = meterModelRepository.findAll();
        assertThat(meterModelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeterModel() throws Exception {
        // Initialize the database
        meterModelRepository.saveAndFlush(meterModel);

        int databaseSizeBeforeDelete = meterModelRepository.findAll().size();

        // Get the meterModel
        restMeterModelMockMvc.perform(delete("/api/meter-models/{id}", meterModel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MeterModel> meterModelList = meterModelRepository.findAll();
        assertThat(meterModelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeterModel.class);
        MeterModel meterModel1 = new MeterModel();
        meterModel1.setId(1L);
        MeterModel meterModel2 = new MeterModel();
        meterModel2.setId(meterModel1.getId());
        assertThat(meterModel1).isEqualTo(meterModel2);
        meterModel2.setId(2L);
        assertThat(meterModel1).isNotEqualTo(meterModel2);
        meterModel1.setId(null);
        assertThat(meterModel1).isNotEqualTo(meterModel2);
    }
}
