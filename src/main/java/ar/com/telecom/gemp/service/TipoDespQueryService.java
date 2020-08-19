package ar.com.telecom.gemp.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import ar.com.telecom.gemp.domain.TipoDesp;
import ar.com.telecom.gemp.domain.*; // for static metamodels
import ar.com.telecom.gemp.repository.TipoDespRepository;
import ar.com.telecom.gemp.service.dto.TipoDespCriteria;

/**
 * Service for executing complex queries for {@link TipoDesp} entities in the database.
 * The main input is a {@link TipoDespCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TipoDesp} or a {@link Page} of {@link TipoDesp} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TipoDespQueryService extends QueryService<TipoDesp> {

    private final Logger log = LoggerFactory.getLogger(TipoDespQueryService.class);

    private final TipoDespRepository tipoDespRepository;

    public TipoDespQueryService(TipoDespRepository tipoDespRepository) {
        this.tipoDespRepository = tipoDespRepository;
    }

    /**
     * Return a {@link List} of {@link TipoDesp} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TipoDesp> findByCriteria(TipoDespCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TipoDesp> specification = createSpecification(criteria);
        return tipoDespRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link TipoDesp} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TipoDesp> findByCriteria(TipoDespCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TipoDesp> specification = createSpecification(criteria);
        return tipoDespRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TipoDespCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TipoDesp> specification = createSpecification(criteria);
        return tipoDespRepository.count(specification);
    }

    /**
     * Function to convert {@link TipoDespCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TipoDesp> createSpecification(TipoDespCriteria criteria) {
        Specification<TipoDesp> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), TipoDesp_.id));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), TipoDesp_.descripcion));
            }
            if (criteria.getValor() != null) {
                specification = specification.and(buildStringSpecification(criteria.getValor(), TipoDesp_.valor));
            }
        }
        return specification;
    }
}
