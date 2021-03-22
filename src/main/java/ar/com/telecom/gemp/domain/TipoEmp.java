package ar.com.telecom.gemp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TipoEmp.
 */
@Entity
@Table(name = "tipo_emp")
public class TipoEmp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "valor")
    private String valor;

    @ManyToOne
    @JsonIgnoreProperties(value = "tipoEmps", allowSetters = true)
    private MasterTipoEmp masterTipoEmp;

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

    public TipoEmp descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getValor() {
        return valor;
    }

    public TipoEmp valor(String valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public MasterTipoEmp getMasterTipoEmp() {
        return masterTipoEmp;
    }

    public TipoEmp masterTipoEmp(MasterTipoEmp masterTipoEmp) {
        this.masterTipoEmp = masterTipoEmp;
        return this;
    }

    public void setMasterTipoEmp(MasterTipoEmp masterTipoEmp) {
        this.masterTipoEmp = masterTipoEmp;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoEmp)) {
            return false;
        }
        return id != null && id.equals(((TipoEmp) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoEmp{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", valor='" + getValor() + "'" +
            "}";
    }
}
