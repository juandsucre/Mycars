package com.melit.mycars.repository;

import com.melit.mycars.domain.Coche;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Coche entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CocheRepository extends JpaRepository<Coche, Long> {

	List<Coche> findByNombre(String nombre);
	List<Coche> findByVendidoFalse();
	
@Query("select p from Coche p where p.propietario.nombre =:nombrePropietario")

	List<Coche> findAllByNombrePropietario(@Param("nombrePropietario") String nombrePropietario);

//@Query("SELEC p from Coche p where p.fechaventa")

List<Coche> findByFechaventaBetween(@Param("fechaInicio") LocalDate fechaInicio, @Param("FechaFinal") LocalDate FechaFinal);
}
