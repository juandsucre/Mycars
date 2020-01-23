package com.melit.mycars.web.rest;

import com.melit.mycars.domain.Incidencia;
import com.melit.mycars.repository.IncidenciaRepository;
import com.melit.mycars.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.melit.mycars.domain.Incidencia}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IncidenciaResource {

    private final Logger log = LoggerFactory.getLogger(IncidenciaResource.class);

    private static final String ENTITY_NAME = "incidencia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IncidenciaRepository incidenciaRepository;

    public IncidenciaResource(IncidenciaRepository incidenciaRepository) {
        this.incidenciaRepository = incidenciaRepository;
    }

    /**
     * {@code POST  /incidencias} : Create a new incidencia.
     *
     * @param incidencia the incidencia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new incidencia, or with status {@code 400 (Bad Request)} if the incidencia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/incidencias")
    public ResponseEntity<Incidencia> createIncidencia(@Valid @RequestBody Incidencia incidencia) throws URISyntaxException {
        log.debug("REST request to save Incidencia : {}", incidencia);
        if (incidencia.getId() != null) {
            throw new BadRequestAlertException("A new incidencia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Incidencia result = incidenciaRepository.save(incidencia);
        return ResponseEntity.created(new URI("/api/incidencias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /incidencias} : Updates an existing incidencia.
     *
     * @param incidencia the incidencia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated incidencia,
     * or with status {@code 400 (Bad Request)} if the incidencia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the incidencia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/incidencias")
    public ResponseEntity<Incidencia> updateIncidencia(@Valid @RequestBody Incidencia incidencia) throws URISyntaxException {
        log.debug("REST request to update Incidencia : {}", incidencia);
        if (incidencia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Incidencia result = incidenciaRepository.save(incidencia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, incidencia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /incidencias} : get all the incidencias.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of incidencias in body.
     */
    @GetMapping("/incidencias")
    public List<Incidencia> getAllIncidencias() {
        log.debug("REST request to get all Incidencias");
        return incidenciaRepository.findAll();
    }

    /**
     * {@code GET  /incidencias/:id} : get the "id" incidencia.
     *
     * @param id the id of the incidencia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the incidencia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/incidencias/{id}")
    public ResponseEntity<Incidencia> getIncidencia(@PathVariable Long id) {
        log.debug("REST request to get Incidencia : {}", id);
        Optional<Incidencia> incidencia = incidenciaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(incidencia);
    }

    /**
     * {@code DELETE  /incidencias/:id} : delete the "id" incidencia.
     *
     * @param id the id of the incidencia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/incidencias/{id}")
    public ResponseEntity<Void> deleteIncidencia(@PathVariable Long id) {
        log.debug("REST request to delete Incidencia : {}", id);
        incidenciaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
