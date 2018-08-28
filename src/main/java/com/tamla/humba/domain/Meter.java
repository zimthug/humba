package com.tamla.humba.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.tamla.humba.domain.enumeration.Owner;

/**
 * A Meter.
 */
@Entity
@Table(name = "meter")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Meter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "meter", length = 20, nullable = false)
    private String meter;

    @NotNull
    @Column(name = "date_manufactured", nullable = false)
    private LocalDate dateManufactured;

    @NotNull
    @Column(name = "status_date", nullable = false)
    private LocalDate statusDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "owner")
    private Owner owner;

    @ManyToOne
    @JsonIgnoreProperties("")
    private MeterType meterType;

    @ManyToOne
    @JsonIgnoreProperties("")
    private MeterModel meterModel;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Warehouse warehouse;

    @ManyToOne
    @JsonIgnoreProperties("")
    private MeterStatus meterStatus;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMeter() {
        return meter;
    }

    public Meter meter(String meter) {
        this.meter = meter;
        return this;
    }

    public void setMeter(String meter) {
        this.meter = meter;
    }

    public LocalDate getDateManufactured() {
        return dateManufactured;
    }

    public Meter dateManufactured(LocalDate dateManufactured) {
        this.dateManufactured = dateManufactured;
        return this;
    }

    public void setDateManufactured(LocalDate dateManufactured) {
        this.dateManufactured = dateManufactured;
    }

    public LocalDate getStatusDate() {
        return statusDate;
    }

    public Meter statusDate(LocalDate statusDate) {
        this.statusDate = statusDate;
        return this;
    }

    public void setStatusDate(LocalDate statusDate) {
        this.statusDate = statusDate;
    }

    public Owner getOwner() {
        return owner;
    }

    public Meter owner(Owner owner) {
        this.owner = owner;
        return this;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public MeterType getMeterType() {
        return meterType;
    }

    public Meter meterType(MeterType meterType) {
        this.meterType = meterType;
        return this;
    }

    public void setMeterType(MeterType meterType) {
        this.meterType = meterType;
    }

    public MeterModel getMeterModel() {
        return meterModel;
    }

    public Meter meterModel(MeterModel meterModel) {
        this.meterModel = meterModel;
        return this;
    }

    public void setMeterModel(MeterModel meterModel) {
        this.meterModel = meterModel;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public Meter warehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
        return this;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public MeterStatus getMeterStatus() {
        return meterStatus;
    }

    public Meter meterStatus(MeterStatus meterStatus) {
        this.meterStatus = meterStatus;
        return this;
    }

    public void setMeterStatus(MeterStatus meterStatus) {
        this.meterStatus = meterStatus;
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
        Meter meter = (Meter) o;
        if (meter.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), meter.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Meter{" +
            "id=" + getId() +
            ", meter='" + getMeter() + "'" +
            ", dateManufactured='" + getDateManufactured() + "'" +
            ", statusDate='" + getStatusDate() + "'" +
            ", owner='" + getOwner() + "'" +
            "}";
    }
}
