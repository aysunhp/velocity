'use strict';

const { randomUUID } = require('crypto');
const { IRepository } = require('./IRepository');

/**
 * In-memory repository. Seeded once per process. Returns deep-cloned items
 * so callers cannot mutate internal state.
 */
class MockRepository extends IRepository {
  constructor(name, seed = []) {
    super();
    this.name = name;
    this.items = seed.map((it) => ({ ...it, _id: it._id || it.id || randomUUID() }));
  }

  static clone(obj) {
    return obj == null ? obj : JSON.parse(JSON.stringify(obj));
  }

  static matches(item, filter) {
    return Object.entries(filter || {}).every(([key, value]) => {
      if (value === undefined || value === null || value === '') return true;
      const v = key.includes('.') ? key.split('.').reduce((o, k) => (o || {})[k], item) : item[key];
      if (Array.isArray(value)) return value.includes(v);
      if (typeof value === 'object' && value !== null) {
        if ('$in' in value) return value.$in.includes(v);
        if ('$gte' in value && v < value.$gte) return false;
        if ('$lte' in value && v > value.$lte) return false;
        if ('$gt' in value && !(v > value.$gt)) return false;
        if ('$lt' in value && !(v < value.$lt)) return false;
        return true;
      }
      return v === value;
    });
  }

  async findAll({ filter = {}, sort, page = 1, limit = 12, search, searchFields = [] } = {}) {
    let result = this.items.filter((it) => MockRepository.matches(it, filter));

    if (search && searchFields.length) {
      const q = String(search).toLowerCase();
      result = result.filter((it) =>
        searchFields.some((f) => String(it[f] ?? '').toLowerCase().includes(q))
      );
    }

    if (sort) {
      const entries = Object.entries(sort);
      result.sort((a, b) => {
        for (const [key, dir] of entries) {
          const av = a[key];
          const bv = b[key];
          if (av === bv) continue;
          const cmp = av > bv ? 1 : -1;
          return dir === -1 || dir === 'desc' ? -cmp : cmp;
        }
        return 0;
      });
    }

    const total = result.length;
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.max(1, Math.min(100, Number(limit) || 12));
    const start = (safePage - 1) * safeLimit;
    const items = result.slice(start, start + safeLimit).map(MockRepository.clone);

    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
    };
  }

  async findOne(filter = {}) {
    const found = this.items.find((it) => MockRepository.matches(it, filter));
    return found ? MockRepository.clone(found) : null;
  }

  async findById(id) {
    return this.findOne({ _id: id });
  }

  async create(data) {
    const item = {
      _id: randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    this.items.unshift(item);
    return MockRepository.clone(item);
  }

  async update(id, patch) {
    const idx = this.items.findIndex((it) => it._id === id);
    if (idx === -1) return null;
    this.items[idx] = {
      ...this.items[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    return MockRepository.clone(this.items[idx]);
  }

  async remove(id) {
    const before = this.items.length;
    this.items = this.items.filter((it) => it._id !== id);
    return this.items.length < before;
  }
}

module.exports = { MockRepository };
