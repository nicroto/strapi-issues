'use strict';

/**
 * Owned.js controller
 *
 * @description: A set of functions called "actions" for managing `Owned`.
 */

module.exports = {

  /**
   * Retrieve owned records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.owned.fetchAll(ctx.query);
  },

  /**
   * Retrieve a owned record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.owned.fetch(ctx.params);
  },

  /**
   * Count owned records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.owned.count(ctx.query);
  },

  /**
   * Create a/an owned record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.owned.add(ctx.request.body);
  },

  /**
   * Update a/an owned record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.owned.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an owned record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.owned.remove(ctx.params);
  }
};
