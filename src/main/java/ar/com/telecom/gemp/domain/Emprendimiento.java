package ar.com.telecom.gemp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Emprendimiento.
 */
@Entity
@Table(name = "emprendimiento")
public class Emprendimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "contacto")
    private String contacto;

    @Column(name = "provincia")
    private String provincia;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprendimientos", allowSetters = true)
    private Obra obra;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprendimientos", allowSetters = true)
    private TipoObra tipoObra;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprendimientos", allowSetters = true)
    private TipoEmp tipoEmp;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprendimientos", allowSetters = true)
    private Estado estado;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprendimientos", allowSetters = true)
    private Competencia competencia;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprendimientos", allowSetters = true)
    private Despliegue despliegue;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprendimientos", allowSetters = true)
    private NSE nSE;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprendimientos", allowSetters = true)
    private Segmento segmento;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprendimientos", allowSetters = true)
    private Tecnologia tecnologia;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprendimientos", allowSetters = true)
    private EjecCuentas ejecCuentas;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprendimientos", allowSetters = true)
    private Direccion direccion;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContacto() {
        return contacto;
    }

    public Emprendimiento contacto(String contacto) {
        this.contacto = contacto;
        return this;
    }

    public void setContacto(String contacto) {
        this.contacto = contacto;
    }

    public String getProvincia() {
        return provincia;
    }

    public Emprendimiento provincia(String provincia) {
        this.provincia = provincia;
        return this;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public Obra getObra() {
        return obra;
    }

    public Emprendimiento obra(Obra obra) {
        this.obra = obra;
        return this;
    }

    public void setObra(Obra obra) {
        this.obra = obra;
    }

    public TipoObra getTipoObra() {
        return tipoObra;
    }

    public Emprendimiento tipoObra(TipoObra tipoObra) {
        this.tipoObra = tipoObra;
        return this;
    }

    public void setTipoObra(TipoObra tipoObra) {
        this.tipoObra = tipoObra;
    }

    public TipoEmp getTipoEmp() {
        return tipoEmp;
    }

    public Emprendimiento tipoEmp(TipoEmp tipoEmp) {
        this.tipoEmp = tipoEmp;
        return this;
    }

    public void setTipoEmp(TipoEmp tipoEmp) {
        this.tipoEmp = tipoEmp;
    }

    public Estado getEstado() {
        return estado;
    }

    public Emprendimiento estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Competencia getCompetencia() {
        return competencia;
    }

    public Emprendimiento competencia(Competencia competencia) {
        this.competencia = competencia;
        return this;
    }

    public void setCompetencia(Competencia competencia) {
        this.competencia = competencia;
    }

    public Despliegue getDespliegue() {
        return despliegue;
    }

    public Emprendimiento despliegue(Despliegue despliegue) {
        this.despliegue = despliegue;
        return this;
    }

    public void setDespliegue(Despliegue despliegue) {
        this.despliegue = despliegue;
    }

    public NSE getNSE() {
        return nSE;
    }

    public Emprendimiento nSE(NSE nSE) {
        this.nSE = nSE;
        return this;
    }

    public void setNSE(NSE nSE) {
        this.nSE = nSE;
    }

    public Segmento getSegmento() {
        return segmento;
    }

    public Emprendimiento segmento(Segmento segmento) {
        this.segmento = segmento;
        return this;
    }

    public void setSegmento(Segmento segmento) {
        this.segmento = segmento;
    }

    public Tecnologia getTecnologia() {
        return tecnologia;
    }

    public Emprendimiento tecnologia(Tecnologia tecnologia) {
        this.tecnologia = tecnologia;
        return this;
    }

    public void setTecnologia(Tecnologia tecnologia) {
        this.tecnologia = tecnologia;
    }

    public EjecCuentas getEjecCuentas() {
        return ejecCuentas;
    }

    public Emprendimiento ejecCuentas(EjecCuentas ejecCuentas) {
        this.ejecCuentas = ejecCuentas;
        return this;
    }

    public void setEjecCuentas(EjecCuentas ejecCuentas) {
        this.ejecCuentas = ejecCuentas;
    }

    public Direccion getDireccion() {
        return direccion;
    }

    public Emprendimiento direccion(Direccion direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(Direccion direccion) {
        this.direccion = direccion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Emprendimiento)) {
            return false;
        }
        return id != null && id.equals(((Emprendimiento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Emprendimiento{" +
            "id=" + getId() +
            ", contacto='" + getContacto() + "'" +
            ", provincia='" + getProvincia() + "'" +
            "}";
    }
}
