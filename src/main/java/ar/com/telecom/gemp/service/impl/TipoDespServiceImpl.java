package ar.com.telecom.gemp.service.impl;

import ar.com.telecom.gemp.service.TipoDespService;
import ar.com.telecom.gemp.domain.TipoDesp;
import ar.com.telecom.gemp.repository.TipoDespRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link TipoDesp}.
 */
@Service
@Transactional
public class TipoDespServiceImpl implements TipoDespService {

    private final Logger log = LoggerFactory.getLogger(TipoDespServiceImpl.class);

    private final TipoDespRepository tipoDespRepository;

    public TipoDespServiceImpl(TipoDespRepository tipoDespRepository) {
        this.tipoDespRepository = tipoDespRepository;
    }

    @Override
    public TipoDesp save(TipoDesp tipoDesp) {
        log.debug("Request to save TipoDesp : {}", tipoDesp);
        return tipoDespRepository.save(tipoDesp);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoDesp> findAll() {
        log.debug("Request to get all TipoDesps");
        return tipoDespRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<TipoDesp> findOne(Long id) {
        log.debug("Request to get TipoDesp : {}", id);
        return tipoDespRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoDesp : {}", id);
        tipoDespRepository.deleteById(id);
    }
}
