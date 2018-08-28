package com.tamla.humba.web.rest;

import com.tamla.humba.HumbaApp;

import com.tamla.humba.domain.MeterMake;
import com.tamla.humba.repository.MeterMakeRepository;
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
 * Test class for the MeterMakeResource REST controller.
 *
 * @see MeterMakeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HumbaApp.class)
public class MeterMakeResourceIntTest {

    private static final String DEFAULT_METER_MAKE = "AAAAAAAAAA";
    private static final String UPDATED_METER_MAKE = "BBBBBBBBBB";

    @Autowired
    private MeterMakeRepository meterMakeRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMeterMakeMockMvc;

    private MeterMake meterMake;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MeterMakeResource meterMakeResource = new MeterMakeResource(meterMakeRepository);
        this.restMeterMakeMockMvc = MockMvcBuilders.standaloneSetup(meterMakeResource)
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
    public static MeterMake createEntity(EntityManager em) {
        MeterMake meterMake = new MeterMake()
            .meterMake(DEFAULT_METER_MAKE);
        return meterMake;
    }

    @Before
    public void initTest() {
        meterMake = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeterMake() throws Exception {
        int databaseSizeBeforeCreate = meterMakeRepository.findAll().size();

        // Create the MeterMake
        restMeterMakeMockMvc.perform(post("/api/meter-makes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meterMake)))
            .andExpect(status().isCreated());

        // Validate the MeterMake in the database
        List<MeterMake> meterMakeList = meterMakeRepository.findAll();
        assertThat(meterMakeList).hasSize(databaseSizeBeforeCreate + 1);
        MeterMake testMeterMake = meterMakeList.get(meterMakeList.size() - 1);
        assertThat(testMeterMake.getMeterMake()).isEqualTo(DEFAULT_METER_MAKE);
    }

    @Test
    @Transactional
    public void createMeterMakeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = meterMakeRepository.findAll().size();

        // Create the MeterMake with an existing ID
        meterMake.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeterMakeMockMvc.perform(post("/api/meter-makes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meterMake)))
            .andExpect(status().isBadRequest());

        // Validate the MeterMake in the database
        List<MeterMake> meterMakeList = meterMakeRepository.findAll();
        assertThat(meterMakeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkMeterMakeIsRequired() throws Exception {
        int databaseSizeBeforeTest = meterMakeRepository.findAll().size();
        // set the field null
        meterMake.setMeterMake(null);

        // Create the MeterMake, which fails.

        restMeterMakeMockMvc.perform(post("/api/meter-makes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meterMake)))
            .andExpect(status().isBadRequest());

        List<MeterMake> meterMakeList = meterMakeRepository.findAll();
        assertThat(meterMakeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMeterMakes() throws Exception {
        // Initialize the database
        meterMakeRepository.saveAndFlush(meterMake);

        // Get all the meterMakeList
        restMeterMakeMockMvc.perform(get("/api/meter-makes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(meterMake.getId().intValue())))
            .andExpect(jsonPath("$.[*].meterMake").value(hasItem(DEFAULT_METER_MAKE.toString())));
    }
    

    @Test
    @Transactional
    public void getMeterMake() throws Exception {
        // Initialize the database
        meterMakeRepository.saveAndFlush(meterMake);

        // Get the meterMake
        restMeterMakeMockMvc.perform(get("/api/meter-makes/{id}", meterMake.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(meterMake.getId().intValue()))
            .andExpect(jsonPath("$.meterMake").value(DEFAULT_METER_MAKE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMeterMake() throws Exception {
        // Get the meterMake
        restMeterMakeMockMvc.perform(get("/api/meter-makes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeterMake() throws Exception {
        // Initialize the database
        meterMakeRepository.saveAndFlush(meterMake);

        int databaseSizeBeforeUpdate = meterMakeRepository.findAll().size();

        // Update the meterMake
        MeterMake updatedMeterMake = meterMakeRepository.findById(meterMake.getId()).get();
        // Disconnect from session so that the updates on updatedMeterMake are not directly saved in db
        em.detach(updatedMeterMake);
        updatedMeterMake
            .meterMake(UPDATED_METER_MAKE);

        restMeterMakeMockMvc.perform(put("/api/meter-makes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeterMake)))
            .andExpect(status().isOk());

        // Validate the MeterMake in the database
        List<MeterMake> meterMakeList = meterMakeRepository.findAll();
        assertThat(meterMakeList).hasSize(databaseSizeBeforeUpdate);
        MeterMake testMeterMake = meterMakeList.get(meterMakeList.size() - 1);
        assertThat(testMeterMake.getMeterMake()).isEqualTo(UPDATED_METER_MAKE);
    }

    @Test
    @Transactional
    public void updateNonExistingMeterMake() throws Exception {
        int databaseSizeBeforeUpdate = meterMakeRepository.findAll().size();

        // Create the MeterMake

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMeterMakeMockMvc.perform(put("/api/meter-makes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meterMake)))
            .andExpect(status().isBadRequest());

        // Validate the MeterMake in the database
        List<MeterMake> meterMakeList = meterMakeRepository.findAll();
        assertThat(meterMakeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeterMake() throws Exception {
        // Initialize the database
        meterMakeRepository.saveAndFlush(meterMake);

        int databaseSizeBeforeDelete = meterMakeRepository.findAll().size();

        // Get the meterMake
        restMeterMakeMockMvc.perform(delete("/api/meter-makes/{id}", meterMake.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MeterMake> meterMakeList = meterMakeRepository.findAll();
        assertThat(meterMakeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeterMake.class);
        MeterMake meterMake1 = new MeterMake();
        meterMake1.setId(1L);
        MeterMake meterMake2 = new MeterMake();
        meterMake2.setId(meterMake1.getId());
        assertThat(meterMake1).isEqualTo(meterMake2);
        meterMake2.setId(2L);
        assertThat(meterMake1).isNotEqualTo(meterMake2);
        meterMake1.setId(null);
        assertThat(meterMake1).isNotEqualTo(meterMake2);
    }
}
