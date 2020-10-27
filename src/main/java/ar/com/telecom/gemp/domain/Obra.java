package ar.com.telecom.gemp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Obra.
 */
@Entity
@Table(name = "obra")
public class Obra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "habilitada")
    private Boolean habilitada;

    @Column(name = "fecha_fin_obra")
    private LocalDate fechaFinObra;

    @ManyToOne
    @JsonIgnoreProperties(value = "obras", allowSetters = true)
    private TipoObra tipoObra;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Obra descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean isHabilitada() {
        return habilitada;
    }

    public Obra habilitada(Boolean habilitada) {
        this.habilitada = habilitada;
        return this;
    }

    public void setHabilitada(Boolean habilitada) {
        this.habilitada = habilitada;
    }

    public LocalDate getFechaFinObra() {
        return fechaFinObra;
    }

    public Obra fechaFinObra(LocalDate fechaFinObra) {
        this.fechaFinObra = fechaFinObra;
        return this;
    }

    public void setFechaFinObra(LocalDate fechaFinObra) {
        this.fechaFinObra = fechaFinObra;
    }

    public TipoObra getTipoObra() {
        return tipoObra;
    }

    public Obra tipoObra(TipoObra tipoObra) {
        this.tipoObra = tipoObra;
        return this;
    }

    public void setTipoObra(TipoObra tipoObra) {
        this.tipoObra = tipoObra;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Obra)) {
            return false;
        }
        return id != null && id.equals(((Obra) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Obra{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", habilitada='" + isHabilitada() + "'" +
            ", fechaFinObra='" + getFechaFinObra() + "'" +
            "}";
    }
}
