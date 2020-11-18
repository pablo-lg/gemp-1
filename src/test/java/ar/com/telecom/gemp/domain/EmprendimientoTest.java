package ar.com.telecom.gemp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ar.com.telecom.gemp.web.rest.TestUtil;

public class EmprendimientoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Emprendimiento.class);
        Emprendimiento emprendimiento1 = new Emprendimiento();
        emprendimiento1.setId(1L);
        Emprendimiento emprendimiento2 = new Emprendimiento();
        emprendimiento2.setId(emprendimiento1.getId());
        assertThat(emprendimiento1).isEqualTo(emprendimiento2);
        emprendimiento2.setId(2L);
        assertThat(emprendimiento1).isNotEqualTo(emprendimiento2);
        emprendimiento1.setId(null);
        assertThat(emprendimiento1).isNotEqualTo(emprendimiento2);
    }
}
