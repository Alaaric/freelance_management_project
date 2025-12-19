/**
 * @swagger
 * /projets/ouverts:
 *   get:
 *     summary: Get all open projects (not assigned to any freelance)
 *     tags: [Projets]
 *     responses:
 *       200:
 *         description: List of open projects
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Projet'
 */

export const projetsPath = {};
