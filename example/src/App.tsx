import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import {
  init,
  startAudioClassification,
  stopAudioClassification,
} from 'react-native-audio-classifier';

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Init" onPress={init} />

      <View style={styles.box} />

      <Button
        title="StartAudioClassification"
        onPress={startAudioClassification}
      />

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
