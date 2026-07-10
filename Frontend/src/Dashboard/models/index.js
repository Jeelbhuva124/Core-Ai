// AdminPanel - Data Models
// Define the shape of data used in the Admin Panel

/**
 * @typedef {Object} AdminUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {string} createdAt
 */

/**
 * @typedef {Object} DashboardStats
 * @property {number} totalUsers
 * @property {number} totalProducts
 * @property {number} totalOrders
 * @property {number} totalRevenue
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {string} status
 * @property {number} total
 * @property {string} createdAt
 */

export {};
