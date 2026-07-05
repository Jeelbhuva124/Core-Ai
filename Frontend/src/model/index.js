/**
 * Shared data models for AWD Project
 * Using JSDoc @typedef for editor intellisense without TypeScript.
 */

// ─── User ─────────────────────────────────────────────────
/**
 * @typedef {Object} User
 * @property {number}  id
 * @property {string}  name
 * @property {string}  email
 * @property {'user'|'admin'} role
 * @property {string}  createdAt
 */

// ─── Product ──────────────────────────────────────────────
/**
 * @typedef {Object} Product
 * @property {number}  id
 * @property {string}  name
 * @property {string}  description
 * @property {number}  price
 * @property {string}  image
 * @property {string}  category
 * @property {number}  stock
 * @property {boolean} [isNew]
 */

// ─── Cart ─────────────────────────────────────────────────
/**
 * @typedef {Object} CartItem
 * @property {Product} product
 * @property {number}  quantity
 */

// ─── Order ────────────────────────────────────────────────
/**
 * @typedef {Object} Order
 * @property {number}  id
 * @property {number}  userId
 * @property {CartItem[]} items
 * @property {'pending'|'processing'|'shipped'|'delivered'|'cancelled'} status
 * @property {number}  total
 * @property {string}  createdAt
 */

// ─── Toast ────────────────────────────────────────────────
/**
 * @typedef {'success'|'error'|'warning'|'info'} ToastType
 *
 * @typedef {Object} Toast
 * @property {string}    id
 * @property {string}    message
 * @property {ToastType} type
 */

// ─── API Response wrapper ─────────────────────────────────
/**
 * @template T
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {T}       data
 * @property {string}  [message]
 * @property {string}  [error]
 */

export {};
