package ar.com.telecom.gemp.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A GrupoUsuario.
 */
@Entity
@Table(name = "grupo_usuario")
public class GrupoUsuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "usuario")
    private String usuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }

    public GrupoUsuario usuario(String usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GrupoUsuario)) {
            return false;
        }
        return id != null && id.equals(((GrupoUsuario) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GrupoUsuario{" +
            "id=" + getId() +
            ", usuario='" + getUsuario() + "'" +
            "}";
    }
}
