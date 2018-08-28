package com.tamla.humba.repository;

import com.tamla.humba.domain.MeterModel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MeterModel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeterModelRepository extends JpaRepository<MeterModel, Long> {

}
