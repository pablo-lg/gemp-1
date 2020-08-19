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

import ar.com.telecom.gemp.domain.TipoObra;
import ar.com.telecom.gemp.domain.*; // for static metamodels
import ar.com.telecom.gemp.repository.TipoObraRepository;
import ar.com.telecom.gemp.service.dto.TipoObraCriteria;

/**
 * Service for executing complex queries for {@link TipoObra} entities in the database.
 * The main input is a {@link TipoObraCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TipoObra} or a {@link Page} of {@link TipoObra} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TipoObraQueryService extends QueryService<TipoObra> {

    private final Logger log = LoggerFactory.getLogger(TipoObraQueryService.class);

    private final TipoObraRepository tipoObraRepository;

    public TipoObraQueryService(TipoObraRepository tipoObraRepository) {
        this.tipoObraRepository = tipoObraRepository;
    }

    /**
     * Return a {@link List} of {@link TipoObra} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TipoObra> findByCriteria(TipoObraCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TipoObra> specification = createSpecification(criteria);
        return tipoObraRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link TipoObra} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TipoObra> findByCriteria(TipoObraCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TipoObra> specification = createSpecification(criteria);
        return tipoObraRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TipoObraCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TipoObra> specification = createSpecification(criteria);
        return tipoObraRepository.count(specification);
    }

    /**
     * Function to convert {@link TipoObraCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TipoObra> createSpecification(TipoObraCriteria criteria) {
        Specification<TipoObra> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), TipoObra_.id));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), TipoObra_.descripcion));
            }
        }
        return specification;
    }
}
