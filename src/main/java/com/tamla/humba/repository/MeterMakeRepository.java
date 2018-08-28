package com.tamla.humba.repository;

import com.tamla.humba.domain.MeterMake;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MeterMake entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeterMakeRepository extends JpaRepository<MeterMake, Long> {

}
