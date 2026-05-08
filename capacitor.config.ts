import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.jolasmedia.noxen',
  appName: 'NOXEN',
  webDir: 'out',
  server: {
    iosScheme: 'capacitor',
  },
};

export default config;