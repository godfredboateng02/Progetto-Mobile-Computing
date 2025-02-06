import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MenuListView from './components/MenuListView';
import CommunicationController from './model/CommunicationController';
import DetailMenuView from './components/DetailMenuView';
import osCall from './model/osCall';
import GestioneOrdini from './viewmodel/GestioneOrdini';

export default function App() {
  console.log(osCall.posizione()); 


  const [screen, setScreen] = useState('Homepage');
  const [menuList, setMenuList] = useState();
  const [textToShow, setTextToShow] = useState('dati in caricamento...');
  const [cardPressed, setCardPressed] = useState();

  useEffect(() => {
    setTextToShow('componente montato');
    CommunicationController.getMenus().then((menuList) => {
      setMenuList(menuList);
      setTextToShow('dati caricati');
    }).then(() => {
      setTextToShow('dati caricati e visualizzati');
    });

  }, []);

  const handleCardPress = (card) => {
    console.log("card premuta", card)
    setCardPressed(card);
    setScreen('Detail');
  }




  console.log("Menu list:",menuList);

  //ho commentato la parte di codice per poterlo runnare
  if (screen === 'Homepage'){
    return (
      <View style={styles.container}>
        <MenuListView menu={menuList} onCardPress={handleCardPress}/>
        <StatusBar style="auto" />
      </View>
    );
  }else if (screen === 'Detail' ){
    console.log("Card pressed:",cardPressed);
    return (
      <View style={styles.container}>

       <DetailMenuView data={cardPressed} onBuyPress={GestioneOrdini.effettuaOrdine} setScreen1 = {setScreen}/>
        
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

