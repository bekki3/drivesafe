import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import Indicator from './components/Indicator';

let eyesShut = 0;
export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [faceData, setFaceData] = useState([]);
  if (!permission) {
    requestPermission();
    return <Text style={{color: "#ccc"}}>No Access to camera.</Text>
  }

  const getFaceDataView = ()=>{
    if(faceData.length === 0){
      return (
        <View>
          <Text style={{backgroundColor: "#fff"}}>No Faces detected.</Text>
        </View>
      )
    }else{
      return faceData.map((face, index)=>{
        if(face.rightEyeOpenProbability < 0.5 && face.leftEyeOpenProbability < 0.5){
          eyesShut++;
        }else{
          eyesShut = 0;
        }
        return (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{eyesShut>5?"Sleeping": "Not Sleeping"}</Text>
            <Text style={styles.message}>Right Eye Open: {Math.round(face.rightEyeOpenProbability*100)}/100</Text>
            <Text style={styles.message}>Left Eye Open: {Math.round(face.leftEyeOpenProbability*100)}/100</Text>
          </View>
        )
      })
    }
  }

  const handleFacesDetected = ({faces}) =>{
    setFaceData(faces);
  }


  return (
  <View style={styles.body}>
    <StatusBar style='light'></StatusBar>
    <Indicator />
  <Camera
      type={CameraType.front}
      style={styles.camera}
      onFacesDetected={handleFacesDetected}
      faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.all,
        minDetectionInterval: 200,
      }}>
      
    </Camera>
    {getFaceDataView()}
  </View>
    
    
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#555",
  },
  camera: {
    width: 300,
    height: 400,
    margin: 50,
    opacity: 1
  },
  messageContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  message: {
    color: "#fff",
    margin: 4,
  }
});
