import {
  NativeModules,
  Platform,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';

type Label = 'background' | 'left' | 'right';
type EventType = 'onResult' | 'onError';

type ResultType = { label: Label; score: number };

type AudioClassificationResult = {
  categories: ResultType[];
  inferenceTime: number;
};

const LINKING_ERROR =
  `The package 'react-native-audio-classifier' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AudioClassifier = NativeModules.AudioClassifier
  ? NativeModules.AudioClassifier
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const eventQueue: EmitterSubscription[] = [];

export const addEventListener = (
  eventName: EventType,
  callback: (payload: AudioClassificationResult) => void
) => {
  const eventEmitter = new NativeEventEmitter();
  const eventListenerObj = eventEmitter.addListener(eventName, callback);
  eventQueue.push(eventListenerObj);
  return eventListenerObj;
};

export const clearAllEventLisseners = () => {
  eventQueue.forEach((eventEmitter) => {
    eventEmitter.remove();
  });
};

export function init() {
  AudioClassifier.init();
}

export function startAudioClassification() {
  AudioClassifier.startAudioClassification();
}

export function stopAudioClassification() {
  AudioClassifier.stopAudioClassification();
}
