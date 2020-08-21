package ar.com.telecom.gemp.service.impl;

import ar.com.telecom.gemp.service.TipoEmpService;
import ar.com.telecom.gemp.domain.TipoEmp;
import ar.com.telecom.gemp.repository.TipoEmpRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link TipoEmp}.
 */
@Service
@Transactional
public class TipoEmpServiceImpl implements TipoEmpService {

    private final Logger log = LoggerFactory.getLogger(TipoEmpServiceImpl.class);

    private final TipoEmpRepository tipoEmpRepository;

    public TipoEmpServiceImpl(TipoEmpRepository tipoEmpRepository) {
        this.tipoEmpRepository = tipoEmpRepository;
    }

    @Override
    public TipoEmp save(TipoEmp tipoEmp) {
        log.debug("Request to save TipoEmp : {}", tipoEmp);
        return tipoEmpRepository.save(tipoEmp);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoEmp> findAll() {
        log.debug("Request to get all TipoEmps");
        return tipoEmpRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<TipoEmp> findOne(Long id) {
        log.debug("Request to get TipoEmp : {}", id);
        return tipoEmpRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoEmp : {}", id);
        tipoEmpRepository.deleteById(id);
    }
}
