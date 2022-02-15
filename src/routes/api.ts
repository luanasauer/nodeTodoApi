import { Router } from 'express';

import * as TodoController from '../controllers/todo.controller';

const router = Router();

router.get('/todo/lista', TodoController.acharMinimoDeDias);

router.get('/todo', TodoController.allTasks);
router.post('/todo', TodoController.addTask);
router.put('/todo/:id', TodoController.updateTask);
router.delete('/todo/:id', TodoController.removeTask);


export default router;