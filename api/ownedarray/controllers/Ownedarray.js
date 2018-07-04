'use strict';

/**
 * Ownedarray.js controller
 *
 * @description: A set of functions called "actions" for managing `Ownedarray`.
 */

module.exports = {

  /**
   * Retrieve ownedarray records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.ownedarray.fetchAll(ctx.query);
  },

  /**
   * Retrieve a ownedarray record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.ownedarray.fetch(ctx.params);
  },

  /**
   * Count ownedarray records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.ownedarray.count(ctx.query);
  },

  /**
   * Create a/an ownedarray record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.ownedarray.add(ctx.request.body);
  },

  /**
   * Update a/an ownedarray record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.ownedarray.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an ownedarray record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.ownedarray.remove(ctx.params);
  }
};
