import iCreateAppointmentsDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';
import Appointments from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: iCreateAppointmentsDTO): Promise<Appointments>;
  findByDate(date: Date): Promise<Appointments | undefined>;
}
