package com.tamla.humba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.tamla.humba.domain.MeterStatus;
import com.tamla.humba.repository.MeterStatusRepository;
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
 * REST controller for managing MeterStatus.
 */
@RestController
@RequestMapping("/api")
public class MeterStatusResource {

    private final Logger log = LoggerFactory.getLogger(MeterStatusResource.class);

    private static final String ENTITY_NAME = "meterStatus";

    private final MeterStatusRepository meterStatusRepository;

    public MeterStatusResource(MeterStatusRepository meterStatusRepository) {
        this.meterStatusRepository = meterStatusRepository;
    }

    /**
     * POST  /meter-statuses : Create a new meterStatus.
     *
     * @param meterStatus the meterStatus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new meterStatus, or with status 400 (Bad Request) if the meterStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meter-statuses")
    @Timed
    public ResponseEntity<MeterStatus> createMeterStatus(@Valid @RequestBody MeterStatus meterStatus) throws URISyntaxException {
        log.debug("REST request to save MeterStatus : {}", meterStatus);
        if (meterStatus.getId() != null) {
            throw new BadRequestAlertException("A new meterStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeterStatus result = meterStatusRepository.save(meterStatus);
        return ResponseEntity.created(new URI("/api/meter-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meter-statuses : Updates an existing meterStatus.
     *
     * @param meterStatus the meterStatus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated meterStatus,
     * or with status 400 (Bad Request) if the meterStatus is not valid,
     * or with status 500 (Internal Server Error) if the meterStatus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meter-statuses")
    @Timed
    public ResponseEntity<MeterStatus> updateMeterStatus(@Valid @RequestBody MeterStatus meterStatus) throws URISyntaxException {
        log.debug("REST request to update MeterStatus : {}", meterStatus);
        if (meterStatus.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MeterStatus result = meterStatusRepository.save(meterStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, meterStatus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meter-statuses : get all the meterStatuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of meterStatuses in body
     */
    @GetMapping("/meter-statuses")
    @Timed
    public List<MeterStatus> getAllMeterStatuses() {
        log.debug("REST request to get all MeterStatuses");
        return meterStatusRepository.findAllByIndInUseIsTrueOrderByMeterStatusAsc();
    }

    /**
     * GET  /meter-statuses/:id : get the "id" meterStatus.
     *
     * @param id the id of the meterStatus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the meterStatus, or with status 404 (Not Found)
     */
    @GetMapping("/meter-statuses/{id}")
    @Timed
    public ResponseEntity<MeterStatus> getMeterStatus(@PathVariable Long id) {
        log.debug("REST request to get MeterStatus : {}", id);
        Optional<MeterStatus> meterStatus = meterStatusRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(meterStatus);
    }

    /**
     * DELETE  /meter-statuses/:id : delete the "id" meterStatus.
     *
     * @param id the id of the meterStatus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meter-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteMeterStatus(@PathVariable Long id) {
        log.debug("REST request to delete MeterStatus : {}", id);

        meterStatusRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
