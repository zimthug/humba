package com.tamla.humba.repository;

import com.tamla.humba.domain.MeterModel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the MeterModel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeterModelRepository extends JpaRepository<MeterModel, Long> {

    List<MeterModel> findAllByOrderByMeterModel();

    List<MeterModel> findAllByMeterType(Long meterType);

}
