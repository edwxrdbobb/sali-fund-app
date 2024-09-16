import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapboxGL from '@rnmapbox/maps';
import ENV from '../../env';

// Ensure this import is at the top of your file
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize Mapbox
MapboxGL.setAccessToken(ENV().MAPBOX_ACCESS_TOKEN || '');

const LookupScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        {MapboxGL.MapView && (
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              zoomLevel={11}
              centerCoordinate={[-122.4194, 37.7749]}
            />
            <MapboxGL.PointAnnotation
              id="marker"
              coordinate={[-122.4194, 37.7749]}
            >
              <View>
                
              </View>
            </MapboxGL.PointAnnotation>
          </MapboxGL.MapView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
export default LookupScreen;

