import iHashProvider from '../models/iHashProvider';

export default class BCryptHashProvider implements iHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
