import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

//components
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

export default function App() {
    const screenWidth=Dimensions.get('screen').width;
    const screenHeight=Dimensions.get('screen').height;
    const birdLeft= screenWidth/2;
    const [BirdBottom, setBirdBottom]= useState(screenHeight/2);
    const [obstaclesLeft, setObstaclesLeft]=useState(screenWidth);
    const obstacleWidth=60;
    const obstacleHeight= 300;
    const gap=200;
    const gravity=3;
    let gameTimerId;
    let obstaclesLeftTimerId
    console.log(obstaclesLeft)
    
    useEffect(()=>{
        if(BirdBottom>0){
            gameTimerId=setInterval(()=>{
                setBirdBottom(BirdBottom=>BirdBottom-gravity)
            },30)
        }
        
        return()=>{
            clearInterval(gameTimerId)
        }
    },[BirdBottom])
    
    //start first obstacles
    useEffect(()=>{
        if(obstaclesLeft> -obstacleWidth){
            obstaclesLeftTimerId=setInterval(()=>{
                setObstaclesLeft(obstaclesLeft=>obstaclesLeft-5)
            },30)
            
            //this stops the obstacles when the it goes out of screen
            return()=>{
                clearInterval(obstaclesLeftTimerId)
            }
        }
        
        //this loops the obstacles
        setObstaclesLeft(screenWidth)
        
        
    },[obstaclesLeft])
    
  return (
    <View style={styles.container}>
      <Bird 
        birdBottom={BirdBottom}
      birdLeft={birdLeft}
      />
      
          <Obstacles
      obstaclesLeft={obstaclesLeft}
      obstacleWidth={obstacleWidth} 
      obstacleHeight={obstacleHeight}
      gap={gap}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
