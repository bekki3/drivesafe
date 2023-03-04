import { View, StyleSheet, Text } from "react-native"
const Indicator = ()=>{
    return <View style={styles.indicator}></View>;
}
const styles = StyleSheet.create({
    indicator: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: "#0f0",
      marginLeft: 50,
      marginTop: 50
    }
  });
export default Indicator;