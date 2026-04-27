'use strict';

const { IRepository } = require('./IRepository');

/**
 * Thin Mongoose-backed repository. Activated when DATA_SOURCE=mongo.
 * Maps the same query shape used by MockRepository onto Mongoose APIs.
 */
class MongoRepository extends IRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  async findAll({ filter = {}, sort, page = 1, limit = 12, search, searchFields = [] } = {}) {
    const query = { ...filter };
    if (search && searchFields.length) {
      const re = new RegExp(String(search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = searchFields.map((f) => ({ [f]: re }));
    }
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.max(1, Math.min(100, Number(limit) || 12));
    const skip = (safePage - 1) * safeLimit;

    const [items, total] = await Promise.all([
      this.model.find(query).sort(sort || { createdAt: -1 }).skip(skip).limit(safeLimit).lean(),
      this.model.countDocuments(query),
    ]);

    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
    };
  }

  async findOne(filter) { return this.model.findOne(filter).lean(); }
  async findById(id) { return this.model.findById(id).lean(); }
  async create(data) { return (await this.model.create(data)).toObject(); }
  async update(id, patch) { return this.model.findByIdAndUpdate(id, patch, { new: true }).lean(); }
  async remove(id) {
    const r = await this.model.findByIdAndDelete(id);
    return Boolean(r);
  }
}

module.exports = { MongoRepository };
