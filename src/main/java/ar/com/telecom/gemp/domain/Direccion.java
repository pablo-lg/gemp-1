package ar.com.telecom.gemp.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A Direccion.
 */
@Entity
@Table(name = "direccion")
public class Direccion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "pais")
    private String pais;

    @Column(name = "provincia")
    private String provincia;

    @Column(name = "partido")
    private String partido;

    @Column(name = "localidad")
    private String localidad;

    @Column(name = "calle")
    private String calle;

    @Column(name = "altura")
    private Long altura;

    @Column(name = "region")
    private String region;

    @Column(name = "subregion")
    private String subregion;

    @Column(name = "hub")
    private String hub;

    @Column(name = "barrios_especiales")
    private String barriosEspeciales;

    @Column(name = "codigo_postal")
    private String codigoPostal;

    @Column(name = "tipo_calle")
    private String tipoCalle;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPais() {
        return pais;
    }

    public Direccion pais(String pais) {
        this.pais = pais;
        return this;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getProvincia() {
        return provincia;
    }

    public Direccion provincia(String provincia) {
        this.provincia = provincia;
        return this;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getPartido() {
        return partido;
    }

    public Direccion partido(String partido) {
        this.partido = partido;
        return this;
    }

    public void setPartido(String partido) {
        this.partido = partido;
    }

    public String getLocalidad() {
        return localidad;
    }

    public Direccion localidad(String localidad) {
        this.localidad = localidad;
        return this;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getCalle() {
        return calle;
    }

    public Direccion calle(String calle) {
        this.calle = calle;
        return this;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public Long getAltura() {
        return altura;
    }

    public Direccion altura(Long altura) {
        this.altura = altura;
        return this;
    }

    public void setAltura(Long altura) {
        this.altura = altura;
    }

    public String getRegion() {
        return region;
    }

    public Direccion region(String region) {
        this.region = region;
        return this;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getSubregion() {
        return subregion;
    }

    public Direccion subregion(String subregion) {
        this.subregion = subregion;
        return this;
    }

    public void setSubregion(String subregion) {
        this.subregion = subregion;
    }

    public String getHub() {
        return hub;
    }

    public Direccion hub(String hub) {
        this.hub = hub;
        return this;
    }

    public void setHub(String hub) {
        this.hub = hub;
    }

    public String getBarriosEspeciales() {
        return barriosEspeciales;
    }

    public Direccion barriosEspeciales(String barriosEspeciales) {
        this.barriosEspeciales = barriosEspeciales;
        return this;
    }

    public void setBarriosEspeciales(String barriosEspeciales) {
        this.barriosEspeciales = barriosEspeciales;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public Direccion codigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
        return this;
    }

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getTipoCalle() {
        return tipoCalle;
    }

    public Direccion tipoCalle(String tipoCalle) {
        this.tipoCalle = tipoCalle;
        return this;
    }

    public void setTipoCalle(String tipoCalle) {
        this.tipoCalle = tipoCalle;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Direccion)) {
            return false;
        }
        return id != null && id.equals(((Direccion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Direccion{" +
            "id=" + getId() +
            ", pais='" + getPais() + "'" +
            ", provincia='" + getProvincia() + "'" +
            ", partido='" + getPartido() + "'" +
            ", localidad='" + getLocalidad() + "'" +
            ", calle='" + getCalle() + "'" +
            ", altura=" + getAltura() +
            ", region='" + getRegion() + "'" +
            ", subregion='" + getSubregion() + "'" +
            ", hub='" + getHub() + "'" +
            ", barriosEspeciales='" + getBarriosEspeciales() + "'" +
            ", codigoPostal='" + getCodigoPostal() + "'" +
            ", tipoCalle='" + getTipoCalle() + "'" +
            "}";
    }
}
