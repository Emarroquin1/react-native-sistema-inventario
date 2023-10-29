import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const Button = ({ onPress, style, icon }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Feather name={icon} size={24} />
  </TouchableOpacity>
)

export default function PostCardItem({ nombre, descripcion, onEdit, onDelete }) {
console.log(nombre)
  return (
    <Card style={styles.item}>
      <View style={styles.rowView}>
        <View>
          <Text style={styles.title}>{nombre}</Text>
          <Text>Descripción: {descripcion}</Text>
        </View>
      </View>
      <View style={styles.rowViewButton}>
      <Button
            onPress={onEdit}
            icon="edit"
            style={{ marginHorizontal: 5 }} />
          <Button onPress={onDelete} style={{ marginHorizontal: 5 }}   icon='trash-2' />
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
   
  },
  rowViewButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    padding: 40,
    margin: 5,
    elevation: 4,
    backgroundColor:'white',
    borderRadius: 8
  },
  title: {
    textAlign:'center',
    fontSize: 18,
  },
})