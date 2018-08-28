package com.tamla.humba.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MeterStatus.
 */
@Entity
@Table(name = "meter_status")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MeterStatus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 30)
    @Column(name = "meter_status", length = 30, nullable = false)
    private String meterStatus;

    @NotNull
    @Column(name = "ind_in_use", nullable = false)
    private Boolean indInUse;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMeterStatus() {
        return meterStatus;
    }

    public MeterStatus meterStatus(String meterStatus) {
        this.meterStatus = meterStatus;
        return this;
    }

    public void setMeterStatus(String meterStatus) {
        this.meterStatus = meterStatus;
    }

    public Boolean isIndInUse() {
        return indInUse;
    }

    public MeterStatus indInUse(Boolean indInUse) {
        this.indInUse = indInUse;
        return this;
    }

    public void setIndInUse(Boolean indInUse) {
        this.indInUse = indInUse;
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
        MeterStatus meterStatus = (MeterStatus) o;
        if (meterStatus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), meterStatus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MeterStatus{" +
            "id=" + getId() +
            ", meterStatus='" + getMeterStatus() + "'" +
            ", indInUse='" + isIndInUse() + "'" +
            "}";
    }
}
