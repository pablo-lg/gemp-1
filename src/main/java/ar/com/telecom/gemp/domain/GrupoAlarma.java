package ar.com.telecom.gemp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A GrupoAlarma.
 */
@Entity
@Table(name = "grupo_alarma")
public class GrupoAlarma implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre_grupo", nullable = false)
    private String nombreGrupo;

    @Column(name = "alarma_tiempo")
    private Long alarmaTiempo;

    @Column(name = "alarma_sva")
    private Long alarmaSva;

    @Column(name = "alarma_businesscase")
    private Long alarmaBusinesscase;

    @ManyToOne
    @JsonIgnoreProperties(value = "grupoAlarmas", allowSetters = true)
    private GrupoEmprendimiento grupoEmprendimiento;

    @ManyToOne
    @JsonIgnoreProperties(value = "grupoAlarmas", allowSetters = true)
    private GrupoUsuario grupoUsuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreGrupo() {
        return nombreGrupo;
    }

    public GrupoAlarma nombreGrupo(String nombreGrupo) {
        this.nombreGrupo = nombreGrupo;
        return this;
    }

    public void setNombreGrupo(String nombreGrupo) {
        this.nombreGrupo = nombreGrupo;
    }

    public Long getAlarmaTiempo() {
        return alarmaTiempo;
    }

    public GrupoAlarma alarmaTiempo(Long alarmaTiempo) {
        this.alarmaTiempo = alarmaTiempo;
        return this;
    }

    public void setAlarmaTiempo(Long alarmaTiempo) {
        this.alarmaTiempo = alarmaTiempo;
    }

    public Long getAlarmaSva() {
        return alarmaSva;
    }

    public GrupoAlarma alarmaSva(Long alarmaSva) {
        this.alarmaSva = alarmaSva;
        return this;
    }

    public void setAlarmaSva(Long alarmaSva) {
        this.alarmaSva = alarmaSva;
    }

    public Long getAlarmaBusinesscase() {
        return alarmaBusinesscase;
    }

    public GrupoAlarma alarmaBusinesscase(Long alarmaBusinesscase) {
        this.alarmaBusinesscase = alarmaBusinesscase;
        return this;
    }

    public void setAlarmaBusinesscase(Long alarmaBusinesscase) {
        this.alarmaBusinesscase = alarmaBusinesscase;
    }

    public GrupoEmprendimiento getGrupoEmprendimiento() {
        return grupoEmprendimiento;
    }

    public GrupoAlarma grupoEmprendimiento(GrupoEmprendimiento grupoEmprendimiento) {
        this.grupoEmprendimiento = grupoEmprendimiento;
        return this;
    }

    public void setGrupoEmprendimiento(GrupoEmprendimiento grupoEmprendimiento) {
        this.grupoEmprendimiento = grupoEmprendimiento;
    }

    public GrupoUsuario getGrupoUsuario() {
        return grupoUsuario;
    }

    public GrupoAlarma grupoUsuario(GrupoUsuario grupoUsuario) {
        this.grupoUsuario = grupoUsuario;
        return this;
    }

    public void setGrupoUsuario(GrupoUsuario grupoUsuario) {
        this.grupoUsuario = grupoUsuario;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GrupoAlarma)) {
            return false;
        }
        return id != null && id.equals(((GrupoAlarma) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GrupoAlarma{" +
            "id=" + getId() +
            ", nombreGrupo='" + getNombreGrupo() + "'" +
            ", alarmaTiempo=" + getAlarmaTiempo() +
            ", alarmaSva=" + getAlarmaSva() +
            ", alarmaBusinesscase=" + getAlarmaBusinesscase() +
            "}";
    }
}
