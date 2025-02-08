import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import CommunicationController from '../model/CommunicationController';
import GestioneOrdini from '../viewmodel/GestioneOrdini';
 

export default function ({data}) {
    
    const [details, setDetails] = useState()
    const [screen, setScreen] = useState(undefined)

    useEffect(()=>{
        CommunicationController.getMenuDetails(data.mid).then((result)=>{
            setDetails(result)
            setScreen("dettaglio")
        }).then((error)=>{
            console.log(error)
        });
    },[]);

    //console.log("Card pressed:",onCart());

    if (screen === "dettaglio"){
        return (
            <View style={styles.container}>

                <Image source={require('../assets/menu.jpg')} style={styles.image}/>
                <Text style={styles.title}>{data.name}</Text>
                <Text>{data.shortDescription}</Text>
                <Text>{details.longDescription}</Text>
                <Text>{data.price}€</Text>
                <Text>{data.deliveryTime}</Text>
                <Button style={styles.acquista} title="Acquista" onPress={()=>GestioneOrdini.effettuaOrdine(data.mid)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    image: {
       //alignSelf: 'center',
        //marginLeft: 400,
        width: 400, // Rendi l'immagine responsive
        height: 250,
         // Mantieni proporzioni corrette
        marginBottom: 20,
        borderWidth: 1,
    },
    acquista: {
        backgroundColor: 'red',
    },
})