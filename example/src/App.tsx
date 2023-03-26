import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import {
  addEventListener,
  init,
  startAudioClassification,
  stopAudioClassification,
} from 'react-native-audio-classifier';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export default function App() {
  React.useEffect(() => {
    addEventListener('onResult', (data) => {
      console.log('onResult', data);
    });

    addEventListener('onError', (data) => {
      console.log('onError', data);
    });
  }, []);

  const handleInit = () => {
    request(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {
      if (result === RESULTS.GRANTED) {
        init();
      } else {
        console.log('Permission denied');
      }
    });
  };

  const handleStart = () => {
    request(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {
      if (result === RESULTS.GRANTED) {
        startAudioClassification();
      } else {
        console.log('Permission denied');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Init" onPress={handleInit} />

      <View style={styles.box} />

      <Button title="StartAudioClassification" onPress={handleStart} />

      <View style={styles.box} />

      <Button
        title="StopAudioClassification"
        onPress={stopAudioClassification}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
