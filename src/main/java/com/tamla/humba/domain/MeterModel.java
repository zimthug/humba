package com.tamla.humba.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MeterModel.
 */
@Entity
@Table(name = "meter_model")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MeterModel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 30)
    @Column(name = "meter_model", length = 30, nullable = false)
    private String meterModel;

    @ManyToOne
    @JsonIgnoreProperties("")
    private MeterMake meterMake;

    @ManyToOne
    @JsonIgnoreProperties("")
    private MeterType meterType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMeterModel() {
        return meterModel;
    }

    public MeterModel meterModel(String meterModel) {
        this.meterModel = meterModel;
        return this;
    }

    public void setMeterModel(String meterModel) {
        this.meterModel = meterModel;
    }

    public MeterMake getMeterMake() {
        return meterMake;
    }

    public MeterModel meterMake(MeterMake meterMake) {
        this.meterMake = meterMake;
        return this;
    }

    public void setMeterMake(MeterMake meterMake) {
        this.meterMake = meterMake;
    }

    public MeterType getMeterType() {
        return meterType;
    }

    public MeterModel meterType(MeterType meterType) {
        this.meterType = meterType;
        return this;
    }

    public void setMeterType(MeterType meterType) {
        this.meterType = meterType;
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
        MeterModel meterModel = (MeterModel) o;
        if (meterModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), meterModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MeterModel{" +
            "id=" + getId() +
            ", meterModel='" + getMeterModel() + "'" +
            "}";
    }
}
