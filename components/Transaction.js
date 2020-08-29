import React from 'react';
import { View, Text } from 'react-native';
import theme from '../theme';
import ContextMenu from "react-native-context-menu-view";

const Transaction = ({transaction}) => (
    <ContextMenu
    actions={[{ title: "Edit", systemIcon: 'pencil'}, { title: "Delete", systemIcon: 'trash', destructive: true }]}
    onPress={(e) => {
      console.warn(
        `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`
      );
    }}>
        <View style={{
            flexDirection: 'row', 
            width: '100%', 
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 30,
            paddingVertical: 15
        }}>
            <View>
                <Text style={{fontSize: 18, fontWeight: '600'}}>Walmart Shopping</Text>
                <Text style={{opacity: 0.33, marginTop: 5, fontSize: 12}}>23 August</Text>
            </View>
            <Text style={{fontSize: 22, color: transaction > 0 ? 'green' : 'red'}}>{transaction}</Text>
        </View>
    </ContextMenu>
)

export default Transaction;