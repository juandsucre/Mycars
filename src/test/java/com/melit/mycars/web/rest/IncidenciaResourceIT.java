package com.melit.mycars.web.rest;

import com.melit.mycars.MycarsApp;
import com.melit.mycars.domain.Incidencia;
import com.melit.mycars.domain.Coche;
import com.melit.mycars.repository.IncidenciaRepository;
import com.melit.mycars.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.melit.mycars.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link IncidenciaResource} REST controller.
 */
@SpringBootTest(classes = MycarsApp.class)
public class IncidenciaResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    @Autowired
    private IncidenciaRepository incidenciaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restIncidenciaMockMvc;

    private Incidencia incidencia;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IncidenciaResource incidenciaResource = new IncidenciaResource(incidenciaRepository);
        this.restIncidenciaMockMvc = MockMvcBuilders.standaloneSetup(incidenciaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Incidencia createEntity(EntityManager em) {
        Incidencia incidencia = new Incidencia()
            .descripcion(DEFAULT_DESCRIPCION)
            .tipo(DEFAULT_TIPO);
        // Add required entity
        Coche coche;
        if (TestUtil.findAll(em, Coche.class).isEmpty()) {
            coche = CocheResourceIT.createEntity(em);
            em.persist(coche);
            em.flush();
        } else {
            coche = TestUtil.findAll(em, Coche.class).get(0);
        }
        incidencia.setIncidenciacoche(coche);
        return incidencia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Incidencia createUpdatedEntity(EntityManager em) {
        Incidencia incidencia = new Incidencia()
            .descripcion(UPDATED_DESCRIPCION)
            .tipo(UPDATED_TIPO);
        // Add required entity
        Coche coche;
        if (TestUtil.findAll(em, Coche.class).isEmpty()) {
            coche = CocheResourceIT.createUpdatedEntity(em);
            em.persist(coche);
            em.flush();
        } else {
            coche = TestUtil.findAll(em, Coche.class).get(0);
        }
        incidencia.setIncidenciacoche(coche);
        return incidencia;
    }

    @BeforeEach
    public void initTest() {
        incidencia = createEntity(em);
    }

    @Test
    @Transactional
    public void createIncidencia() throws Exception {
        int databaseSizeBeforeCreate = incidenciaRepository.findAll().size();

        // Create the Incidencia
        restIncidenciaMockMvc.perform(post("/api/incidencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incidencia)))
            .andExpect(status().isCreated());

        // Validate the Incidencia in the database
        List<Incidencia> incidenciaList = incidenciaRepository.findAll();
        assertThat(incidenciaList).hasSize(databaseSizeBeforeCreate + 1);
        Incidencia testIncidencia = incidenciaList.get(incidenciaList.size() - 1);
        assertThat(testIncidencia.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testIncidencia.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    public void createIncidenciaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = incidenciaRepository.findAll().size();

        // Create the Incidencia with an existing ID
        incidencia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIncidenciaMockMvc.perform(post("/api/incidencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incidencia)))
            .andExpect(status().isBadRequest());

        // Validate the Incidencia in the database
        List<Incidencia> incidenciaList = incidenciaRepository.findAll();
        assertThat(incidenciaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllIncidencias() throws Exception {
        // Initialize the database
        incidenciaRepository.saveAndFlush(incidencia);

        // Get all the incidenciaList
        restIncidenciaMockMvc.perform(get("/api/incidencias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(incidencia.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)));
    }
    
    @Test
    @Transactional
    public void getIncidencia() throws Exception {
        // Initialize the database
        incidenciaRepository.saveAndFlush(incidencia);

        // Get the incidencia
        restIncidenciaMockMvc.perform(get("/api/incidencias/{id}", incidencia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(incidencia.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO));
    }

    @Test
    @Transactional
    public void getNonExistingIncidencia() throws Exception {
        // Get the incidencia
        restIncidenciaMockMvc.perform(get("/api/incidencias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIncidencia() throws Exception {
        // Initialize the database
        incidenciaRepository.saveAndFlush(incidencia);

        int databaseSizeBeforeUpdate = incidenciaRepository.findAll().size();

        // Update the incidencia
        Incidencia updatedIncidencia = incidenciaRepository.findById(incidencia.getId()).get();
        // Disconnect from session so that the updates on updatedIncidencia are not directly saved in db
        em.detach(updatedIncidencia);
        updatedIncidencia
            .descripcion(UPDATED_DESCRIPCION)
            .tipo(UPDATED_TIPO);

        restIncidenciaMockMvc.perform(put("/api/incidencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIncidencia)))
            .andExpect(status().isOk());

        // Validate the Incidencia in the database
        List<Incidencia> incidenciaList = incidenciaRepository.findAll();
        assertThat(incidenciaList).hasSize(databaseSizeBeforeUpdate);
        Incidencia testIncidencia = incidenciaList.get(incidenciaList.size() - 1);
        assertThat(testIncidencia.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testIncidencia.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingIncidencia() throws Exception {
        int databaseSizeBeforeUpdate = incidenciaRepository.findAll().size();

        // Create the Incidencia

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIncidenciaMockMvc.perform(put("/api/incidencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(incidencia)))
            .andExpect(status().isBadRequest());

        // Validate the Incidencia in the database
        List<Incidencia> incidenciaList = incidenciaRepository.findAll();
        assertThat(incidenciaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIncidencia() throws Exception {
        // Initialize the database
        incidenciaRepository.saveAndFlush(incidencia);

        int databaseSizeBeforeDelete = incidenciaRepository.findAll().size();

        // Delete the incidencia
        restIncidenciaMockMvc.perform(delete("/api/incidencias/{id}", incidencia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Incidencia> incidenciaList = incidenciaRepository.findAll();
        assertThat(incidenciaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
