/**
 * @swagger
 * components:
 *   schemas:
 *     Entreprise:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Company ID
 *           example: 1
 *         nom:
 *           type: string
 *           description: Company name
 *           example: TechCorp
 *         secteur:
 *           type: string
 *           description: Industry sector
 *           example: Technology
 *     
 *     CreateEntreprise:
 *       type: object
 *       required:
 *         - nom
 *         - secteur
 *       properties:
 *         nom:
 *           type: string
 *           description: Company name
 *           example: TechCorp
 *         secteur:
 *           type: string
 *           description: Industry sector
 *           example: Technology
 */
