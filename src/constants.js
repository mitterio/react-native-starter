import { Platform } from 'react-native'

export const starterAppServerHost = () => {
  switch (Platform.OS) {
    case 'android':
      return 'http://10.0.2.2:3001'
    default:
      return 'http://localhost:3001'
  }
}

export const applicationId = 'D1z0j-6wmGq-OgulX-yixb4'