package com.melit.mycars.repository;

import com.melit.mycars.domain.Propietario;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Propietario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropietarioRepository extends JpaRepository<Propietario, Long> {

}
