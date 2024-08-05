/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWraper from '../components/screenWraper';
import BackButton from '../components/backButton';
import { color } from '../thems';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { get_lost_objects } from '../api/StudentServiceManager/lostObject';

const screenWidth = Dimensions.get('window').width; // Get screen width

export default function ZoneScreen() {
  const navigation = useNavigation();
  const [tableHead, setTableHead] = useState(['Name', 'Status', 'Claimer', 'Update', 'Delete']);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    get_lost_objects()
      .then(response => {
        if (response && response.data) {
          const formattedData = response.data.map(lostObject => [
            lostObject.name, 
            lostObject.status, 
            lostObject.claimer, 
            '', // Placeholder for update button
            '',  // Placeholder for delete button
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
    <TouchableOpacity onPress={() => navigation.navigate('Update')}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Update</Text>
      </View>
    </TouchableOpacity>
  );

  const deleteButton = (data, index) => (
    <TouchableOpacity>
      <View style={styles.btnDelete}>
        <Text style={styles.btnText}>Delete</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWraper>
      <View className="flex justify-between h-full mx-4 mt-10">
        <View>
        <View className="mt-5">
          <View className="relative flex-row justify-between items-center p-4">
            <View className=" absolute top-0 bottom-5 left-0 z-10">
              <BackButton/>
            </View>
            <Text className={`${color} text-xl font-bold text-center mt-5`}>LostObject List</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Add')} style={{backgroundColor:'#04bf04' }} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
              <Text className={color.heading}>Report Object</Text>
            </TouchableOpacity>
          </View>
        </View>
          <View className="mt-10">
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
  height: 60, // Increase header height
  backgroundColor: '#4F4F4F', // Darker shade for better contrast
  },
  text: { 
    margin: 6,
    color: '#000', // Change text color to white for better readability
    textAlign: 'center', 
  },

  row: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF1C1', 
    minHeight: 60, // Slightly taller rows for better touch interaction
    alignItems: 'center',
    marginVertical: 2, // Adds space between rows
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
