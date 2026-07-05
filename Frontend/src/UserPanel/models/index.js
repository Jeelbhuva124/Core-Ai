// UserPanel - Product Model
// Define the shape of data used in the User Panel

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} image
 * @property {string} category
 * @property {boolean} [isNew]
 */

/**
 * @typedef {Object} CartItem
 * @property {Product} product
 * @property {number} quantity
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 */

export {};
