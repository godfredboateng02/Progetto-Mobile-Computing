import { react } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MenuElement() {
    return (
        <View style={styles.container}>
            <Text>Nome del menu</Text>
            <Text>Descrizione del menu</Text>
            <Text>Prezzo del menu</Text>
            <Text>Distanza
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        borderWidth: 1,
        margin: 10,
        
    },
});