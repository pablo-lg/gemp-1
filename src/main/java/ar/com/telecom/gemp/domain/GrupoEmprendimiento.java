package ar.com.telecom.gemp.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A GrupoEmprendimiento.
 */
@Entity
@Table(name = "grupo_emprendimiento")
public class GrupoEmprendimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "es_protegido")
    private Boolean esProtegido;

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

    public GrupoEmprendimiento descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean isEsProtegido() {
        return esProtegido;
    }

    public GrupoEmprendimiento esProtegido(Boolean esProtegido) {
        this.esProtegido = esProtegido;
        return this;
    }

    public void setEsProtegido(Boolean esProtegido) {
        this.esProtegido = esProtegido;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GrupoEmprendimiento)) {
            return false;
        }
        return id != null && id.equals(((GrupoEmprendimiento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GrupoEmprendimiento{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", esProtegido='" + isEsProtegido() + "'" +
            "}";
    }
}
