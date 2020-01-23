package com.melit.mycars.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Incidencia.
 */
@Entity
@Table(name = "incidencia")
public class Incidencia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 35)
    @Column(name = "descripcion", length = 35)
    private String descripcion;

    @Size(max = 20)
    @Column(name = "tipo", length = 20)
    private String tipo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("incidencias")
    private Coche incidenciacoche;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Incidencia descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipo() {
        return tipo;
    }

    public Incidencia tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Coche getIncidenciacoche() {
        return incidenciacoche;
    }

    public Incidencia incidenciacoche(Coche coche) {
        this.incidenciacoche = coche;
        return this;
    }

    public void setIncidenciacoche(Coche coche) {
        this.incidenciacoche = coche;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Incidencia)) {
            return false;
        }
        return id != null && id.equals(((Incidencia) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Incidencia{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
