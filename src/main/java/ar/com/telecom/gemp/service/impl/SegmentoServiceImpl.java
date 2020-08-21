package ar.com.telecom.gemp.service.impl;

import ar.com.telecom.gemp.service.SegmentoService;
import ar.com.telecom.gemp.domain.Segmento;
import ar.com.telecom.gemp.repository.SegmentoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Segmento}.
 */
@Service
@Transactional
public class SegmentoServiceImpl implements SegmentoService {

    private final Logger log = LoggerFactory.getLogger(SegmentoServiceImpl.class);

    private final SegmentoRepository segmentoRepository;

    public SegmentoServiceImpl(SegmentoRepository segmentoRepository) {
        this.segmentoRepository = segmentoRepository;
    }

    @Override
    public Segmento save(Segmento segmento) {
        log.debug("Request to save Segmento : {}", segmento);
        return segmentoRepository.save(segmento);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Segmento> findAll() {
        log.debug("Request to get all Segmentos");
        return segmentoRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Segmento> findOne(Long id) {
        log.debug("Request to get Segmento : {}", id);
        return segmentoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Segmento : {}", id);
        segmentoRepository.deleteById(id);
    }
}
