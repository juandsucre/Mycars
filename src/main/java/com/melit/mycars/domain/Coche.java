package com.melit.mycars.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Coche.
 */
@Entity
@Table(name = "coche")
public class Coche implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 35)
    @Column(name = "nombre", length = 35)
    private String nombre;

    @Size(max = 35)
    @Column(name = "modelo", length = 35)
    private String modelo;

    @Column(name = "precio")
    private Double precio;

    @Column(name = "vendido")
    private Boolean vendido;

    @Column(name = "fechaventa")
    private LocalDate fechaventa;
    
    @Column(name="owner")
    private String owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Coche nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getModelo() {
        return modelo;
    }

    public Coche modelo(String modelo) {
        this.modelo = modelo;
        return this;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Double getPrecio() {
        return precio;
    }

    public Coche precio(Double precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Boolean isVendido() {
        return vendido;
    }

    public Coche vendido(Boolean vendido) {
        this.vendido = vendido;
        return this;
    }

    public void setVendido(Boolean vendido) {
        this.vendido = vendido;
    }

    public LocalDate getFechaventa() {
        return fechaventa;
    }

    public Coche fechaventa(LocalDate fechaventa) {
        this.fechaventa = fechaventa;
        return this;
    }

    public void setFechaventa(LocalDate fechaventa) {
        this.fechaventa = fechaventa;
    }
    
    
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public Boolean getVendido() {
		return vendido;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Coche)) {
            return false;
        }
        return id != null && id.equals(((Coche) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Coche{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", modelo='" + getModelo() + "'" +
            ", precio=" + getPrecio() +
            ", vendido='" + isVendido() + "'" +
            ", fechaventa='" + getFechaventa() + "'" +
            "}";
    }
}
