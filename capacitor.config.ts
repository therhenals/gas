import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.luisbytes.gas',
  appName: 'Gas',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
