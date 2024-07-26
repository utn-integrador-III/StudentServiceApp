/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, { Component, useState } from 'react';
import BackButton from '../components/backButton';
import { useNavigation } from '@react-navigation/native';
import ScreenWraper from '../components/screenWraper';
import { color } from '../thems';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

export default function LostObjectScreen() {
  const navigation = useNavigation();
  const [tableHead, setTableHead] = useState(['Head', 'Head2', 'Head3', 'Head4', 'Head5']);
  const [tableData, setTableData] = useState([
    ['1', '2', '3', '4'],
    ['a', 'b', 'c', 'd'],
    ['1', '2', '3', '4'],
    ['a', 'b', 'c', 'd'],
  ]);
  const alertAction = (index, action) => {
    Alert.alert(`This is row ${index + 1} for ${action}`);
  };

  const updateButton = (data, index) => (
    <TouchableOpacity onPress={() => alertAction(index, 'Update')}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Update</Text>
      </View>
    </TouchableOpacity>
  );

  const deleteButton = (data, index) => (
    <TouchableOpacity onPress={() => alertAction(index, 'Delete')}>
      <View style={styles.btnDelete}>
        <Text style={styles.btnText}>Delete</Text>
      </View>
    </TouchableOpacity>
  );

  return (
  <ScreenWraper>
      <View className="flex justify-between h-full mx-4 mt-10">
        <View className="mt-5">
          <View className="relative flex-row justify-between items-center p-4">
            <View className=" absolute top-0 bottom-5 left-0 z-10">
              <BackButton/>
            </View>
            <Text className={`${color.button} text-xl font-bold text-center mt-5`}>Lost List</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Home')} style={{backgroundColor:'#04bf04' }} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
              <Text className={color.heading}>Add LostObject</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-5">
            <Table borderStyle={{borderColor: 'transparent'}}>
              <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
              {
                tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellData} textStyle={styles.text}/>
                      ))
                    }
                    <Cell data={updateButton(null, index)} textStyle={styles.text}/>
                    <Cell data={deleteButton(null, index)} textStyle={styles.text}/>
                  </TableWrapper>
                ))
              }
          </Table>
          </View>
        </View>
      </View>
    </ScreenWraper>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnDelete: { width: 58, height: 18, backgroundColor: '#DB5461', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  textTitle: { textAlign: 'center', fontWeight: 'bold', fontSize: 24, marginBottom: 12 }
});
