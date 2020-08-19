package ar.com.telecom.gemp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ar.com.telecom.gemp.web.rest.TestUtil;

public class TipoDespTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoDesp.class);
        TipoDesp tipoDesp1 = new TipoDesp();
        tipoDesp1.setId(1L);
        TipoDesp tipoDesp2 = new TipoDesp();
        tipoDesp2.setId(tipoDesp1.getId());
        assertThat(tipoDesp1).isEqualTo(tipoDesp2);
        tipoDesp2.setId(2L);
        assertThat(tipoDesp1).isNotEqualTo(tipoDesp2);
        tipoDesp1.setId(null);
        assertThat(tipoDesp1).isNotEqualTo(tipoDesp2);
    }
}
