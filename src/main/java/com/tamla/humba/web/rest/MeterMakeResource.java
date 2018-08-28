package com.tamla.humba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.tamla.humba.domain.MeterMake;
import com.tamla.humba.repository.MeterMakeRepository;
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
 * REST controller for managing MeterMake.
 */
@RestController
@RequestMapping("/api")
public class MeterMakeResource {

    private final Logger log = LoggerFactory.getLogger(MeterMakeResource.class);

    private static final String ENTITY_NAME = "meterMake";

    private final MeterMakeRepository meterMakeRepository;

    public MeterMakeResource(MeterMakeRepository meterMakeRepository) {
        this.meterMakeRepository = meterMakeRepository;
    }

    /**
     * POST  /meter-makes : Create a new meterMake.
     *
     * @param meterMake the meterMake to create
     * @return the ResponseEntity with status 201 (Created) and with body the new meterMake, or with status 400 (Bad Request) if the meterMake has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meter-makes")
    @Timed
    public ResponseEntity<MeterMake> createMeterMake(@Valid @RequestBody MeterMake meterMake) throws URISyntaxException {
        log.debug("REST request to save MeterMake : {}", meterMake);
        if (meterMake.getId() != null) {
            throw new BadRequestAlertException("A new meterMake cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeterMake result = meterMakeRepository.save(meterMake);
        return ResponseEntity.created(new URI("/api/meter-makes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meter-makes : Updates an existing meterMake.
     *
     * @param meterMake the meterMake to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated meterMake,
     * or with status 400 (Bad Request) if the meterMake is not valid,
     * or with status 500 (Internal Server Error) if the meterMake couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meter-makes")
    @Timed
    public ResponseEntity<MeterMake> updateMeterMake(@Valid @RequestBody MeterMake meterMake) throws URISyntaxException {
        log.debug("REST request to update MeterMake : {}", meterMake);
        if (meterMake.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MeterMake result = meterMakeRepository.save(meterMake);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, meterMake.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meter-makes : get all the meterMakes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of meterMakes in body
     */
    @GetMapping("/meter-makes")
    @Timed
    public List<MeterMake> getAllMeterMakes() {
        log.debug("REST request to get all MeterMakes");
        return meterMakeRepository.findAll();
    }

    /**
     * GET  /meter-makes/:id : get the "id" meterMake.
     *
     * @param id the id of the meterMake to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the meterMake, or with status 404 (Not Found)
     */
    @GetMapping("/meter-makes/{id}")
    @Timed
    public ResponseEntity<MeterMake> getMeterMake(@PathVariable Long id) {
        log.debug("REST request to get MeterMake : {}", id);
        Optional<MeterMake> meterMake = meterMakeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(meterMake);
    }

    /**
     * DELETE  /meter-makes/:id : delete the "id" meterMake.
     *
     * @param id the id of the meterMake to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meter-makes/{id}")
    @Timed
    public ResponseEntity<Void> deleteMeterMake(@PathVariable Long id) {
        log.debug("REST request to delete MeterMake : {}", id);

        meterMakeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
