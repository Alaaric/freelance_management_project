/**
 * @swagger
 * components:
 *   schemas:
 *     Freelance:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Freelance ID
 *           example: 1
 *         nom:
 *           type: string
 *           description: Name
 *           example: Dupont
 *         email:
 *           type: string
 *           format: email
 *           description: Email address
 *           example: jean.dupont@example.com
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           description: Skills
 *           example: [JavaScript, TypeScript, React]
 *         tjm:
 *           type: integer
 *           description: Daily rate
 *           example: 450
 *     
 *     CreateFreelance:
 *       type: object
 *       required:
 *         - nom
 *         - email
 *         - skills
 *         - tjm
 *       properties:
 *         nom:
 *           type: string
 *           description: Name
 *           example: Dupont
 *         email:
 *           type: string
 *           format: email
 *           description: Email address
 *           example: jean.dupont@example.com
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           description: Skills
 *           example: [JavaScript, TypeScript, React]
 *         tjm:
 *           type: integer
 *           description: Daily rate
 *           example: 450
 */
