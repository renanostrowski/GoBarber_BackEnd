import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentsService);

    const appointment = await createAppointment.execute({
      provider_id,
      date: parseDate,
    });

    return response.json(appointment);
  }
}
