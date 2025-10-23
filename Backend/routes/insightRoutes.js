import express from 'express';
import validUserMiddleware from '../middleware/validUser.js'; // Path as needed
import { getAIInsights, getStatistics } from '../controllers/insightsController.js';

const insightRouter = express.Router();

insightRouter.get('/ai-analysis', validUserMiddleware, getAIInsights);
insightRouter.get('/statistics', validUserMiddleware, getStatistics);

export default insightRouter;
