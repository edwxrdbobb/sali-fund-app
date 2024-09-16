import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "SALi",
  slug: "sali",
  // ... other configurations
  plugins: [
    [
      "@rnmapbox/maps",
      {
        mapboxAccessToken: "pk.pk.eyJ1IjoiZWR3YXJkLWJlZSIsImEiOiJjbGY4dnphYWIxdTlhM3RvMXgydm1mOG0wIn0.vyha3m_ZxEkM9ZCic-woOQ"
      }
    ]
  ]
});