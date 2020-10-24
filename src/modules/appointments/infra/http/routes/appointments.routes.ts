import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticared';

import AppointmentsController from '../controllers/AppointmentsController';

const appontmentsController = new AppointmentsController();

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   response.json(appointments);
// });

appointmentsRouter.post('/', appontmentsController.create);

export default appointmentsRouter;
