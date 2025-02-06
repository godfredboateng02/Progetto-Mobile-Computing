import { react } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MenuElement  from './MenuElement';

export default function MenuList() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>I nostri menu</Text>
            <FlatList
                data = {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
                renderItem = {() => <MenuElement />}
                keyExtractor = {(item) => item.toString()}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',

    },
    title:{
        fontSize: 30
    }
});