package ar.com.telecom.gemp.service.impl;

import ar.com.telecom.gemp.service.TipoObraService;
import ar.com.telecom.gemp.domain.TipoObra;
import ar.com.telecom.gemp.repository.TipoObraRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TipoObra}.
 */
@Service
@Transactional
public class TipoObraServiceImpl implements TipoObraService {

    private final Logger log = LoggerFactory.getLogger(TipoObraServiceImpl.class);

    private final TipoObraRepository tipoObraRepository;

    public TipoObraServiceImpl(TipoObraRepository tipoObraRepository) {
        this.tipoObraRepository = tipoObraRepository;
    }

    @Override
    public TipoObra save(TipoObra tipoObra) {
        log.debug("Request to save TipoObra : {}", tipoObra);
        return tipoObraRepository.save(tipoObra);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TipoObra> findAll(Pageable pageable) {
        log.debug("Request to get all TipoObras");
        return tipoObraRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<TipoObra> findOne(Long id) {
        log.debug("Request to get TipoObra : {}", id);
        return tipoObraRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoObra : {}", id);
        tipoObraRepository.deleteById(id);
    }
}
