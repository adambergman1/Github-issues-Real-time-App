/**
 * homeController.
 *
 * @author Adam Bergman
 * @version 1.0
 */

const homeController = {}

/**
 * index GET
 */
homeController.index = (req, res, next) => res.render('home/index')

// Exports.
module.exports = homeController
