package com.tamla.humba.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MeterMake.
 */
@Entity
@Table(name = "meter_make")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MeterMake implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 30)
    @Column(name = "meter_make", length = 30, nullable = false)
    private String meterMake;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMeterMake() {
        return meterMake;
    }

    public MeterMake meterMake(String meterMake) {
        this.meterMake = meterMake;
        return this;
    }

    public void setMeterMake(String meterMake) {
        this.meterMake = meterMake;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MeterMake meterMake = (MeterMake) o;
        if (meterMake.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), meterMake.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MeterMake{" +
            "id=" + getId() +
            ", meterMake='" + getMeterMake() + "'" +
            "}";
    }
}
