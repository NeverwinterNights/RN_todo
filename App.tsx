import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Main} from "./src/app/Main";
import {Provider} from "react-redux";
import {store} from "./src/app/store";

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <StatusBar style="auto"/>
                <SafeAreaView style={{flex: 1}}>
                    <Main/>
                </SafeAreaView>
            </View>
        </Provider>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
