/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWraper from '../components/screenWraper';
import BackButton from '../components/backButton';
import { color } from '../thems';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { get_zones } from '../api/StudentServiceManager/zone';

const screenWidth = Dimensions.get('window').width; // Get screen width

export default function ZoneScreen() {
  const navigation = useNavigation();
  const [tableHead, setTableHead] = useState(['ID', 'Name', 'Location']);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    get_zones()
      .then(response => {
        if (response && response.data) {
          const formattedData = response.data.map(zone => [
            zone._id, 
            zone.name, 
            zone.location,
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



  return (
      <ScreenWraper>
        <ScrollView>
            <View className="flex justify-between h-full mx-4 mt-2">
              <View>
              <View className="mt-5">
                <View className="relative flex-row justify-between items-center p-4">
                  <View className=" absolute top-0 bottom-5 left-0 z-10">
                    <BackButton/>
                  </View>
                  <Text className={`${color.heading} text-xl font-bold text-center mt-5 font-serif`}>Zone List</Text>
                </View>
              </View>
                <View className="mt-1">
                  <Table borderStyle={{borderColor: 'transparent'}}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                    {tableData.map((rowData, index) => (
                      <TableWrapper key={index} style={styles.row}>
                        {rowData.map((cellData, cellIndex) => (
                          <Cell 
                            key={cellIndex} 
                            data={cellIndex >= 2 ? (cellIndex === 2 ? (cellData) : (cellData)) : cellData} 
                            textStyle={styles.text}
                            style={[styles.cell, {flex: (cellIndex === 0 ? 2 : 3)}]}// Adjust cell flex based on content
                          />
                        ))}
                      </TableWrapper>
                    ))}
                  </Table>
                </View>
              </View>
            </View>
        </ScrollView>
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
      backgroundColor: '#1B3069', // Darker shade for better contrast
      },
      text: { 
        margin: 6,
        color: '#f7f3f2', // Change text color to white for better readability
        textAlign: 'center', 
      },
    
      row: { 
        flexDirection: 'row', 
        backgroundColor: '#B5C0D0', 
        minHeight: 60, // Slightly taller rows for better touch interaction
        alignItems: 'center',
        marginVertical: 2, // Adds space between rows
      },
      cell: { 
        flex: 1, // Ensures equal width for all cells unless specified
        alignItems: 'center', 
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
