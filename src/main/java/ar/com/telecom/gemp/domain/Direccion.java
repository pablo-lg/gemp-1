package ar.com.telecom.gemp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

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

    
    @Column(name = "identification", unique = true)
    private String identification;

    @NotNull
    @Column(name = "pais", nullable = false)
    private String pais;

    @NotNull
    @Column(name = "provincia", nullable = false)
    private String provincia;

    @NotNull
    @Column(name = "partido", nullable = false)
    private String partido;

    @NotNull
    @Column(name = "localidad", nullable = false)
    private String localidad;

    @NotNull
    @Column(name = "calle", nullable = false)
    private String calle;

    @NotNull
    @Column(name = "altura", nullable = false)
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

    @Column(name = "zona_competencia")
    private String zonaCompetencia;

    @Column(name = "intersection_left")
    private String intersectionLeft;

    @Column(name = "intersection_right")
    private String intersectionRight;

    @Column(name = "street_type")
    private String streetType;

    @Column(name = "latitud")
    private String latitud;

    @Column(name = "longitud")
    private String longitud;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentification() {
        return identification;
    }

    public Direccion identification(String identification) {
        this.identification = identification;
        return this;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
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

    public String getZonaCompetencia() {
        return zonaCompetencia;
    }

    public Direccion zonaCompetencia(String zonaCompetencia) {
        this.zonaCompetencia = zonaCompetencia;
        return this;
    }

    public void setZonaCompetencia(String zonaCompetencia) {
        this.zonaCompetencia = zonaCompetencia;
    }

    public String getIntersectionLeft() {
        return intersectionLeft;
    }

    public Direccion intersectionLeft(String intersectionLeft) {
        this.intersectionLeft = intersectionLeft;
        return this;
    }

    public void setIntersectionLeft(String intersectionLeft) {
        this.intersectionLeft = intersectionLeft;
    }

    public String getIntersectionRight() {
        return intersectionRight;
    }

    public Direccion intersectionRight(String intersectionRight) {
        this.intersectionRight = intersectionRight;
        return this;
    }

    public void setIntersectionRight(String intersectionRight) {
        this.intersectionRight = intersectionRight;
    }

    public String getStreetType() {
        return streetType;
    }

    public Direccion streetType(String streetType) {
        this.streetType = streetType;
        return this;
    }

    public void setStreetType(String streetType) {
        this.streetType = streetType;
    }

    public String getLatitud() {
        return latitud;
    }

    public Direccion latitud(String latitud) {
        this.latitud = latitud;
        return this;
    }

    public void setLatitud(String latitud) {
        this.latitud = latitud;
    }

    public String getLongitud() {
        return longitud;
    }

    public Direccion longitud(String longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(String longitud) {
        this.longitud = longitud;
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
            ", identification='" + getIdentification() + "'" +
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
            ", zonaCompetencia='" + getZonaCompetencia() + "'" +
            ", intersectionLeft='" + getIntersectionLeft() + "'" +
            ", intersectionRight='" + getIntersectionRight() + "'" +
            ", streetType='" + getStreetType() + "'" +
            ", latitud='" + getLatitud() + "'" +
            ", longitud='" + getLongitud() + "'" +
            "}";
    }
}
