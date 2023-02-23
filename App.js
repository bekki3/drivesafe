import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';


import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default function App() {
  //const [hasPermission, setHasPermission] = useState(true);
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
        // console.log(face);
        // const eyesShut = face.rightEyeOpenProbability < 0.4 && face.leftEyeOpenProbability < 0.4;
        // const winking = !eyesShut && (face.rightEyeOpenProbability < 0.4 || face.leftEyeOpenProbability < 0.4);
        // const smiling = face.smilingProbability > 0.7;
        return (
          <View>
            <Text>Right Eye Open: {Math.round(face.rightEyeOpenProbability*100)}/100</Text>
            <Text>Left Eye Open: {Math.round(face.leftEyeOpenProbability*100)}/100</Text>
            <Text>Smiling Detected: {Math.round(face.smilingProbability*100)}/100</Text>
          </View>
        )
      })
    }
  }

  const handleFacesDetected = ({faces}) =>{
    setFaceData(faces);
  }


  return (
    <Camera 
      type={Camera.Constants.Type.front}
      style={styles.camera}
      onFacesDetected={handleFacesDetected}
      faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.all,
        minDetectionInterval: 1000,
        tracking: true
      }}>
      {getFaceDataView()}
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: 300,
    height: 400,
    margin: 50
  }
});
