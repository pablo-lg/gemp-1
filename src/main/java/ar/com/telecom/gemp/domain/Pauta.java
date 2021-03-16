package ar.com.telecom.gemp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Pauta.
 */
@Entity
@Table(name = "pauta")
public class Pauta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "anios")
    private Long anios;

    @Column(name = "tipo_pauta")
    private String tipoPauta;

    @ManyToOne
    @JsonIgnoreProperties(value = "pautas", allowSetters = true)
    private MasterTipoEmp masterTipoEmp;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAnios() {
        return anios;
    }

    public Pauta anios(Long anios) {
        this.anios = anios;
        return this;
    }

    public void setAnios(Long anios) {
        this.anios = anios;
    }

    public String getTipoPauta() {
        return tipoPauta;
    }

    public Pauta tipoPauta(String tipoPauta) {
        this.tipoPauta = tipoPauta;
        return this;
    }

    public void setTipoPauta(String tipoPauta) {
        this.tipoPauta = tipoPauta;
    }

    public MasterTipoEmp getMasterTipoEmp() {
        return masterTipoEmp;
    }

    public Pauta masterTipoEmp(MasterTipoEmp masterTipoEmp) {
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
        if (!(o instanceof Pauta)) {
            return false;
        }
        return id != null && id.equals(((Pauta) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pauta{" +
            "id=" + getId() +
            ", anios=" + getAnios() +
            ", tipoPauta='" + getTipoPauta() + "'" +
            "}";
    }
}
