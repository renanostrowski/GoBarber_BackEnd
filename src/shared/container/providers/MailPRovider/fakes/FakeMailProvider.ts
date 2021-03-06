import iMailProvider from '../models/iMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements iMailProvider {
  private messages: IMessage[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
    });
  }
}
