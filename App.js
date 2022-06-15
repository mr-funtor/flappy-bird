import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback,Text } from 'react-native';

//components
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

export default function App() {
    const screenWidth=Dimensions.get('screen').width;
    const screenHeight=Dimensions.get('screen').height;
    const birdLeft= screenWidth/2;
    const [BirdBottom, setBirdBottom]= useState(screenHeight/2-20);
    const [obstaclesLeft, setObstaclesLeft]=useState(screenWidth);
    const [obstaclesLeftTwo, setObstaclesLeftTwo]=useState(screenWidth + screenWidth/2);
    const [obstaclesNegHeight,setObstaclesNegHeight]=useState(0);
    const [obstaclesNegHeightTwo,setObstaclesNegHeightTwo]=useState(0);
    const obstacleWidth=60;
    const obstacleHeight= 300;
    const gap=200;
    const gravity=3;
    let gameTimerId;
    let obstaclesLeftTimerId
    let obstaclesLeftTimerIdTwo
    const [isGameOver, setIsGameOver]= useState(false)
    const [score,setScore]=useState(0);

    
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
    
    const jump=()=>{
        if(!isGameOver && (BirdBottom<screenHeight)){
            setBirdBottom(birdBottom=>birdBottom+50)
        }
    }
    
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
        setObstaclesNegHeight(-Math.random()*100)
        setScore(score=>score+1)
    },[obstaclesLeft])
    
    
    //start second obstacles
    useEffect(()=>{
        if(obstaclesLeftTwo> -obstacleWidth){
            obstaclesLeftTimerIdTwo=setInterval(()=>{
                setObstaclesLeftTwo(obstaclesLeftTwo=>obstaclesLeftTwo-5)
            },30)
            
            //this stops the obstacles when the it goes out of screen
            return()=>{
                clearInterval(obstaclesLeftTimerIdTwo)
            }
        }
        
        //this loops the obstacles
        setObstaclesLeftTwo(screenWidth)
        setObstaclesNegHeightTwo(-Math.random()*100)
        setScore(score=>score+1)
    },[obstaclesLeftTwo])
    
    
    //check for collisions
    useEffect(()=>{
        
        if (
            ((BirdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
            BirdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
            (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 )
            )
            || 
            ((BirdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
            BirdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
            (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
            )
        ) 
        {
            gameOver()

        }
    })
    
    
    const gameOver = () => {
      clearInterval(gameTimerId)
      clearInterval(obstaclesLeftTimerId)
      clearInterval(obstaclesLeftTimerIdTwo)
        setIsGameOver(true)
    }

    
    
  return (
      <TouchableWithoutFeedback onPress={jump}>
        <View style={styles.container}>
        {isGameOver && <Text>{score}</Text>}
          <Bird 
            birdBottom={BirdBottom}
          birdLeft={birdLeft}
          />

              <Obstacles
          obstaclesLeft={obstaclesLeft}
          obstacleWidth={obstacleWidth} 
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeight}
          gap={gap}
          color={"blue"}
          />

          <Obstacles
          obstaclesLeft={obstaclesLeftTwo}
          obstacleWidth={obstacleWidth} 
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeightTwo}
          gap={gap}
          color={"green"}
          />

        </View>
      </TouchableWithoutFeedback>
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
