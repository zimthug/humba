package com.tamla.humba.repository;

import com.tamla.humba.domain.MeterStatus;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MeterStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeterStatusRepository extends JpaRepository<MeterStatus, Long> {

}
