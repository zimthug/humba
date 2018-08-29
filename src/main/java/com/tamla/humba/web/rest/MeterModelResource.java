package com.tamla.humba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.tamla.humba.domain.MeterModel;
import com.tamla.humba.repository.MeterModelRepository;
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
 * REST controller for managing MeterModel.
 */
@RestController
@RequestMapping("/api")
public class MeterModelResource {

    private final Logger log = LoggerFactory.getLogger(MeterModelResource.class);

    private static final String ENTITY_NAME = "meterModel";

    private final MeterModelRepository meterModelRepository;

    public MeterModelResource(MeterModelRepository meterModelRepository) {
        this.meterModelRepository = meterModelRepository;
    }

    /**
     * POST  /meter-models : Create a new meterModel.
     *
     * @param meterModel the meterModel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new meterModel, or with status 400 (Bad Request) if the meterModel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meter-models")
    @Timed
    public ResponseEntity<MeterModel> createMeterModel(@Valid @RequestBody MeterModel meterModel) throws URISyntaxException {
        log.debug("REST request to save MeterModel : {}", meterModel);
        if (meterModel.getId() != null) {
            throw new BadRequestAlertException("A new meterModel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeterModel result = meterModelRepository.save(meterModel);
        return ResponseEntity.created(new URI("/api/meter-models/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meter-models : Updates an existing meterModel.
     *
     * @param meterModel the meterModel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated meterModel,
     * or with status 400 (Bad Request) if the meterModel is not valid,
     * or with status 500 (Internal Server Error) if the meterModel couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meter-models")
    @Timed
    public ResponseEntity<MeterModel> updateMeterModel(@Valid @RequestBody MeterModel meterModel) throws URISyntaxException {
        log.debug("REST request to update MeterModel : {}", meterModel);
        if (meterModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MeterModel result = meterModelRepository.save(meterModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, meterModel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meter-models : get all the meterModels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of meterModels in body
     */
    @GetMapping("/meter-models")
    @Timed
    public List<MeterModel> getAllMeterModels() {
        log.debug("REST request to get all MeterModels");
        return meterModelRepository.findAllByOrOrderByMeterModel();
    }


    /**
     * GET  /meter-models-bytype/{meterTypeId} : get all the meterModels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of meterModels in body
     */
    @GetMapping("/meter-models-bytype/{meterTypeId}")
    @Timed
    public List<MeterModel> getAllMeterModels(@PathVariable Long meterTypeId) {
        log.debug("REST request to get all MeterModels with MeterTypeID");
        return meterModelRepository.findAllByMeterTypeEquals(meterTypeId);
    }


    /**
     * GET  /meter-models/:id : get the "id" meterModel.
     *
     * @param id the id of the meterModel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the meterModel, or with status 404 (Not Found)
     */
    @GetMapping("/meter-models/{id}")
    @Timed
    public ResponseEntity<MeterModel> getMeterModel(@PathVariable Long id) {
        log.debug("REST request to get MeterModel : {}", id);
        Optional<MeterModel> meterModel = meterModelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(meterModel);
    }

    /**
     * DELETE  /meter-models/:id : delete the "id" meterModel.
     *
     * @param id the id of the meterModel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meter-models/{id}")
    @Timed
    public ResponseEntity<Void> deleteMeterModel(@PathVariable Long id) {
        log.debug("REST request to delete MeterModel : {}", id);

        meterModelRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
