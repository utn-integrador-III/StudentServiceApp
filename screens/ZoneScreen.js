/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWraper from '../components/screenWraper';
import BackButton from '../components/backButton';
import { color } from '../thems';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { get_zones } from '../api/StudentServiceManager/zone';

const screenWidth = Dimensions.get('window').width; // Get screen width

export default function ZoneScreen() {
  const navigation = useNavigation();
  const [tableHead, setTableHead] = useState(['ID', 'Name', 'Location', 'Update', 'Delete']);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    get_zones()
      .then(response => {
        if (response && response.data) {
          const formattedData = response.data.map(zone => [
            zone._id, 
            zone.name, 
            zone.location, 
            '', // Placeholder for update button
            ''  // Placeholder for delete button
          ]);
          setTableData(formattedData);
        } else {
          console.error('Unexpected API response structure:', response);
        }
      })
      .catch(error => {
        console.error('Failed to fetch Zones', error);
      });
  }, []);

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
      <View style={{flex: 1, justifyContent: 'space-between', marginHorizontal: 4, marginTop: 10}}>
        <View>
          <View className="mt-10"style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4}}>
            <BackButton/>
            <Text style={[styles.textTitle, {color: color.button}]}>Zone List</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{backgroundColor: '#04bf04', padding: 2, paddingHorizontal: 3, borderRadius: 2}}>
              <Text style={[styles.text, {color: color.heading}]}>Add Zone</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-12">
            <Table borderStyle={{borderColor: 'transparent'}}>
              <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
              {tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell 
                      key={cellIndex} 
                      data={cellIndex >= 3 ? (cellIndex === 3 ? updateButton(cellData, index) : deleteButton(cellData, index)) : cellData} 
                      textStyle={styles.text}
                      style={[styles.cell, {flex: (cellIndex === 0 ? 2 : 3)}]} // Adjust cell flex based on content
                    />
                  ))}
                </TableWrapper>
              ))}
            </Table>
          </View>
        </View>
      </View>
    </ScreenWraper>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#fff', 
  },
  head: { 
    height: 50, 
    backgroundColor: '#808B97', 
  },
  text: { 
    margin: 6,
    textAlign: 'center', 
  },
  row: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF1C1', 
    minHeight: 50,
    alignItems: 'center', 
  },
  cell: { 
    flex: 1, // Ensures equal width for all cells unless specified
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  btn: { 
    width: screenWidth * 0.15, // Responsive width
    height: 35, // Larger touch area
    backgroundColor: '#78B7BB', 
    borderRadius: 2,
    justifyContent: 'center', 
  },
  btnDelete: { 
    width: screenWidth * 0.15, // Responsive width
    height: 35, // Larger touch area
    backgroundColor: '#DB5461', 
    borderRadius: 2,
    justifyContent: 'center', 
  },
  btnText: { 
    textAlign: 'center', 
    color: '#fff', 
  },
  textTitle: { 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 24, 
    marginBottom: 12,
    flex: 1, // Give the title flex space to center it properly
    color: '#000',
  },
});
