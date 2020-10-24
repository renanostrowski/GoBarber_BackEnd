import { container } from 'tsyringe';

import iStorageProvider from './StorageProvider/models/iStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import iMailProvider from './MailPRovider/models/iMailProvider';
import EtherealMailProvider from './MailPRovider/implementations/EtherealMailProvider';

container.registerSingleton<iStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<iMailProvider>(
  'MailProvider',
  EtherealMailProvider,
);
