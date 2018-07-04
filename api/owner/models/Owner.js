'use strict';

/**
 * Lifecycle callbacks for the `Owner` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model) => {},

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, result) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, results) => {},

  // Fired before a `fetch` operation.
  // beforeFetch: async (model) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, result) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  beforeCreate: async (model) => {
    strapi.log.info (`Creating Owner...`);
    var ownedarray = await Ownedarray.create ({
            items: []
        });

    strapi.log.info (`Creating owner.ownedarray`);
    model.ownedarray = ownedarray._id;
  },

  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, result) => {},

  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model) => {},

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, result) => {},

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  afterDestroy: async (model, result) => {
    strapi.log.info (`Deleted Owner with _id:${result._id}.`);

    strapi.log.info (`-->Deleting ownedarray with _id:${result.ownedarray._id}`);
    await Ownedarray.deleteOne ({ _id: result.ownedarray._id });
  }
};
