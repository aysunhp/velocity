'use strict';

/**
 * Generic repository contract used by all services. Each implementation
 * (MockRepository, MongoRepository) MUST honor this shape so the
 * controllers/services remain implementation-agnostic.
 *
 * findAll(query)
 *   query = { filter, sort, page, limit, search, searchFields }
 *   returns { items, total, page, limit, totalPages }
 *
 * findOne(filter)        returns item | null
 * findById(id)           returns item | null
 * create(data)           returns created item
 * update(id, patch)      returns updated item | null
 * remove(id)             returns boolean
 */
class IRepository {
  /* eslint-disable no-unused-vars */
  async findAll(_query) { throw new Error('Not implemented'); }
  async findOne(_filter) { throw new Error('Not implemented'); }
  async findById(_id) { throw new Error('Not implemented'); }
  async create(_data) { throw new Error('Not implemented'); }
  async update(_id, _patch) { throw new Error('Not implemented'); }
  async remove(_id) { throw new Error('Not implemented'); }
  /* eslint-enable no-unused-vars */
}

module.exports = { IRepository };
