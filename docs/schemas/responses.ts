/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           description: Response data
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         data:
 *           type: object
 *           nullable: true
 *           example: null
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Error message
 *               code:
 *                 type: integer
 *                 example: 400
 *     
 *     CandidatureResponse:
 *       type: object
 *       properties:
 *         statut:
 *           type: string
 *           enum: [ACCEPTEE, REFUSEE]
 *           example: ACCEPTEE
 *         message:
 *           type: string
 *           example: Application accepted! You are assigned to the project.
 *         reasons:
 *           type: array
 *           items:
 *             type: string
 *           description: Rejection reasons (only if REFUSEE)
 *           example: []
 *         projet:
 *           $ref: '#/components/schemas/Projet'
 *           description: Updated project (only if ACCEPTEE)
 */
