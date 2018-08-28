package com.tamla.humba.web.rest;

import com.tamla.humba.HumbaApp;

import com.tamla.humba.domain.MeterType;
import com.tamla.humba.repository.MeterTypeRepository;
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
 * Test class for the MeterTypeResource REST controller.
 *
 * @see MeterTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HumbaApp.class)
public class MeterTypeResourceIntTest {

    private static final String DEFAULT_METER_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_METER_TYPE = "BBBBBBBBBB";

    @Autowired
    private MeterTypeRepository meterTypeRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMeterTypeMockMvc;

    private MeterType meterType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MeterTypeResource meterTypeResource = new MeterTypeResource(meterTypeRepository);
        this.restMeterTypeMockMvc = MockMvcBuilders.standaloneSetup(meterTypeResource)
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
    public static MeterType createEntity(EntityManager em) {
        MeterType meterType = new MeterType()
            .meterType(DEFAULT_METER_TYPE);
        return meterType;
    }

    @Before
    public void initTest() {
        meterType = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeterType() throws Exception {
        int databaseSizeBeforeCreate = meterTypeRepository.findAll().size();

        // Create the MeterType
        restMeterTypeMockMvc.perform(post("/api/meter-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meterType)))
            .andExpect(status().isCreated());

        // Validate the MeterType in the database
        List<MeterType> meterTypeList = meterTypeRepository.findAll();
        assertThat(meterTypeList).hasSize(databaseSizeBeforeCreate + 1);
        MeterType testMeterType = meterTypeList.get(meterTypeList.size() - 1);
        assertThat(testMeterType.getMeterType()).isEqualTo(DEFAULT_METER_TYPE);
    }

    @Test
    @Transactional
    public void createMeterTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = meterTypeRepository.findAll().size();

        // Create the MeterType with an existing ID
        meterType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeterTypeMockMvc.perform(post("/api/meter-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meterType)))
            .andExpect(status().isBadRequest());

        // Validate the MeterType in the database
        List<MeterType> meterTypeList = meterTypeRepository.findAll();
        assertThat(meterTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkMeterTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = meterTypeRepository.findAll().size();
        // set the field null
        meterType.setMeterType(null);

        // Create the MeterType, which fails.

        restMeterTypeMockMvc.perform(post("/api/meter-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meterType)))
            .andExpect(status().isBadRequest());

        List<MeterType> meterTypeList = meterTypeRepository.findAll();
        assertThat(meterTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMeterTypes() throws Exception {
        // Initialize the database
        meterTypeRepository.saveAndFlush(meterType);

        // Get all the meterTypeList
        restMeterTypeMockMvc.perform(get("/api/meter-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(meterType.getId().intValue())))
            .andExpect(jsonPath("$.[*].meterType").value(hasItem(DEFAULT_METER_TYPE.toString())));
    }
    

    @Test
    @Transactional
    public void getMeterType() throws Exception {
        // Initialize the database
        meterTypeRepository.saveAndFlush(meterType);

        // Get the meterType
        restMeterTypeMockMvc.perform(get("/api/meter-types/{id}", meterType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(meterType.getId().intValue()))
            .andExpect(jsonPath("$.meterType").value(DEFAULT_METER_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMeterType() throws Exception {
        // Get the meterType
        restMeterTypeMockMvc.perform(get("/api/meter-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeterType() throws Exception {
        // Initialize the database
        meterTypeRepository.saveAndFlush(meterType);

        int databaseSizeBeforeUpdate = meterTypeRepository.findAll().size();

        // Update the meterType
        MeterType updatedMeterType = meterTypeRepository.findById(meterType.getId()).get();
        // Disconnect from session so that the updates on updatedMeterType are not directly saved in db
        em.detach(updatedMeterType);
        updatedMeterType
            .meterType(UPDATED_METER_TYPE);

        restMeterTypeMockMvc.perform(put("/api/meter-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeterType)))
            .andExpect(status().isOk());

        // Validate the MeterType in the database
        List<MeterType> meterTypeList = meterTypeRepository.findAll();
        assertThat(meterTypeList).hasSize(databaseSizeBeforeUpdate);
        MeterType testMeterType = meterTypeList.get(meterTypeList.size() - 1);
        assertThat(testMeterType.getMeterType()).isEqualTo(UPDATED_METER_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingMeterType() throws Exception {
        int databaseSizeBeforeUpdate = meterTypeRepository.findAll().size();

        // Create the MeterType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMeterTypeMockMvc.perform(put("/api/meter-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meterType)))
            .andExpect(status().isBadRequest());

        // Validate the MeterType in the database
        List<MeterType> meterTypeList = meterTypeRepository.findAll();
        assertThat(meterTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeterType() throws Exception {
        // Initialize the database
        meterTypeRepository.saveAndFlush(meterType);

        int databaseSizeBeforeDelete = meterTypeRepository.findAll().size();

        // Get the meterType
        restMeterTypeMockMvc.perform(delete("/api/meter-types/{id}", meterType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MeterType> meterTypeList = meterTypeRepository.findAll();
        assertThat(meterTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeterType.class);
        MeterType meterType1 = new MeterType();
        meterType1.setId(1L);
        MeterType meterType2 = new MeterType();
        meterType2.setId(meterType1.getId());
        assertThat(meterType1).isEqualTo(meterType2);
        meterType2.setId(2L);
        assertThat(meterType1).isNotEqualTo(meterType2);
        meterType1.setId(null);
        assertThat(meterType1).isNotEqualTo(meterType2);
    }
}
