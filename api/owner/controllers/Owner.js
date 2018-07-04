'use strict';

/**
 * Owner.js controller
 *
 * @description: A set of functions called "actions" for managing `Owner`.
 */

module.exports = {

  /**
   * Retrieve owner records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.owner.fetchAll(ctx.query);
  },

  /**
   * Retrieve a owner record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.owner.fetch(ctx.params);
  },

  /**
   * Count owner records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.owner.count(ctx.query);
  },

  /**
   * Create a/an owner record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.owner.add(ctx.request.body);
  },

  /**
   * Update a/an owner record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.owner.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an owner record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.owner.remove(ctx.params);
  }
};
