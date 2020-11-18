package ar.com.telecom.gemp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A EjecCuentas.
 */
@Entity
@Table(name = "ejec_cuentas")
public class EjecCuentas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "celular")
    private String celular;

    @Column(name = "mail")
    private String mail;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "repcom_1")
    private String repcom1;

    @Column(name = "repcom_2")
    private String repcom2;

    @ManyToOne
    @JsonIgnoreProperties(value = "ejecCuentas", allowSetters = true)
    private Segmento segmento;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTelefono() {
        return telefono;
    }

    public EjecCuentas telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getApellido() {
        return apellido;
    }

    public EjecCuentas apellido(String apellido) {
        this.apellido = apellido;
        return this;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getCelular() {
        return celular;
    }

    public EjecCuentas celular(String celular) {
        this.celular = celular;
        return this;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getMail() {
        return mail;
    }

    public EjecCuentas mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getNombre() {
        return nombre;
    }

    public EjecCuentas nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRepcom1() {
        return repcom1;
    }

    public EjecCuentas repcom1(String repcom1) {
        this.repcom1 = repcom1;
        return this;
    }

    public void setRepcom1(String repcom1) {
        this.repcom1 = repcom1;
    }

    public String getRepcom2() {
        return repcom2;
    }

    public EjecCuentas repcom2(String repcom2) {
        this.repcom2 = repcom2;
        return this;
    }

    public void setRepcom2(String repcom2) {
        this.repcom2 = repcom2;
    }

    public Segmento getSegmento() {
        return segmento;
    }

    public EjecCuentas segmento(Segmento segmento) {
        this.segmento = segmento;
        return this;
    }

    public void setSegmento(Segmento segmento) {
        this.segmento = segmento;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EjecCuentas)) {
            return false;
        }
        return id != null && id.equals(((EjecCuentas) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EjecCuentas{" +
            "id=" + getId() +
            ", telefono='" + getTelefono() + "'" +
            ", apellido='" + getApellido() + "'" +
            ", celular='" + getCelular() + "'" +
            ", mail='" + getMail() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", repcom1='" + getRepcom1() + "'" +
            ", repcom2='" + getRepcom2() + "'" +
            "}";
    }
}
