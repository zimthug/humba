package com.tamla.humba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.tamla.humba.domain.MeterType;
import com.tamla.humba.repository.MeterTypeRepository;
import com.tamla.humba.web.rest.errors.BadRequestAlertException;
import com.tamla.humba.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MeterType.
 */
@RestController
@RequestMapping("/api")
public class MeterTypeResource {

    private final Logger log = LoggerFactory.getLogger(MeterTypeResource.class);

    private static final String ENTITY_NAME = "meterType";

    private final MeterTypeRepository meterTypeRepository;

    public MeterTypeResource(MeterTypeRepository meterTypeRepository) {
        this.meterTypeRepository = meterTypeRepository;
    }

    /**
     * POST  /meter-types : Create a new meterType.
     *
     * @param meterType the meterType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new meterType, or with status 400 (Bad Request) if the meterType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meter-types")
    @Timed
    public ResponseEntity<MeterType> createMeterType(@Valid @RequestBody MeterType meterType) throws URISyntaxException {
        log.debug("REST request to save MeterType : {}", meterType);
        if (meterType.getId() != null) {
            throw new BadRequestAlertException("A new meterType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeterType result = meterTypeRepository.save(meterType);
        return ResponseEntity.created(new URI("/api/meter-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meter-types : Updates an existing meterType.
     *
     * @param meterType the meterType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated meterType,
     * or with status 400 (Bad Request) if the meterType is not valid,
     * or with status 500 (Internal Server Error) if the meterType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meter-types")
    @Timed
    public ResponseEntity<MeterType> updateMeterType(@Valid @RequestBody MeterType meterType) throws URISyntaxException {
        log.debug("REST request to update MeterType : {}", meterType);
        if (meterType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MeterType result = meterTypeRepository.save(meterType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, meterType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meter-types : get all the meterTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of meterTypes in body
     */
    @GetMapping("/meter-types")
    @Timed
    public List<MeterType> getAllMeterTypes() {
        log.debug("REST request to get all MeterTypes");
        return meterTypeRepository.findAll();
    }

    /**
     * GET  /meter-types/:id : get the "id" meterType.
     *
     * @param id the id of the meterType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the meterType, or with status 404 (Not Found)
     */
    @GetMapping("/meter-types/{id}")
    @Timed
    public ResponseEntity<MeterType> getMeterType(@PathVariable Long id) {
        log.debug("REST request to get MeterType : {}", id);
        Optional<MeterType> meterType = meterTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(meterType);
    }

    /**
     * DELETE  /meter-types/:id : delete the "id" meterType.
     *
     * @param id the id of the meterType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meter-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteMeterType(@PathVariable Long id) {
        log.debug("REST request to delete MeterType : {}", id);

        meterTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
