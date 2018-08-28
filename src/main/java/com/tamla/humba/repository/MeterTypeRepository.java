package com.tamla.humba.repository;

import com.tamla.humba.domain.MeterType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MeterType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeterTypeRepository extends JpaRepository<MeterType, Long> {

}
