package ar.com.telecom.gemp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ar.com.telecom.gemp.web.rest.TestUtil;

public class NSETest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NSE.class);
        NSE nSE1 = new NSE();
        nSE1.setId(1L);
        NSE nSE2 = new NSE();
        nSE2.setId(nSE1.getId());
        assertThat(nSE1).isEqualTo(nSE2);
        nSE2.setId(2L);
        assertThat(nSE1).isNotEqualTo(nSE2);
        nSE1.setId(null);
        assertThat(nSE1).isNotEqualTo(nSE2);
    }
}
