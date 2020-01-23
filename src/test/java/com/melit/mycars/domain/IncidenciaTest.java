package com.melit.mycars.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.melit.mycars.web.rest.TestUtil;

public class IncidenciaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Incidencia.class);
        Incidencia incidencia1 = new Incidencia();
        incidencia1.setId(1L);
        Incidencia incidencia2 = new Incidencia();
        incidencia2.setId(incidencia1.getId());
        assertThat(incidencia1).isEqualTo(incidencia2);
        incidencia2.setId(2L);
        assertThat(incidencia1).isNotEqualTo(incidencia2);
        incidencia1.setId(null);
        assertThat(incidencia1).isNotEqualTo(incidencia2);
    }
}
