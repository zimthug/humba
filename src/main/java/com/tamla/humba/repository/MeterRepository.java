package com.tamla.humba.repository;

import com.tamla.humba.domain.Meter;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Meter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeterRepository extends JpaRepository<Meter, Long> {

}
