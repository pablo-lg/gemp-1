package ar.com.telecom.gemp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ar.com.telecom.gemp.web.rest.TestUtil;

public class GrupoUsuarioTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GrupoUsuario.class);
        GrupoUsuario grupoUsuario1 = new GrupoUsuario();
        grupoUsuario1.setId(1L);
        GrupoUsuario grupoUsuario2 = new GrupoUsuario();
        grupoUsuario2.setId(grupoUsuario1.getId());
        assertThat(grupoUsuario1).isEqualTo(grupoUsuario2);
        grupoUsuario2.setId(2L);
        assertThat(grupoUsuario1).isNotEqualTo(grupoUsuario2);
        grupoUsuario1.setId(null);
        assertThat(grupoUsuario1).isNotEqualTo(grupoUsuario2);
    }
}
