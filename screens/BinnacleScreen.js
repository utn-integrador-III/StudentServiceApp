/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView} from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import BackButton from '../components/backButton';
import { useNavigation } from '@react-navigation/native';
import ScreenWraper from '../components/screenWraper';
import { color } from '../thems';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { get_categories } from '../api/StudentServiceManager/category';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

const screenWidth = Dimensions.get('window').width; // Get screen width

export default function CategoryScreen() {
  const navigation = useNavigation();
  const [tableHead, setTableHead] = useState(['Name', 'Computer #', 'Date', 'Action']);
  const [tableData, setTableData] = useState([
    ['Sebastian Mata', '15', '2024-07-13', ''],
  ]);
  const [compNumb, setCompNumb] = useState([]);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    get_categories()
    .then(response => {
      if (response && response.data) {
        const formattedData = response.data.map(lostObject => ({
          label: lostObject.category_name,
          value: lostObject.category_name,
        }));
        setCategories(formattedData);
      } else {
        console.error('Unexpected API response structure:', response);
      }
    })
    .catch(error => {
      console.error('Failed to fetch categories', error);
    });
  }, []);

  const deleteButton = (data, index) => (
    <TouchableOpacity onPress={()=> {alertAction(index, 'Delete');}}>
      <View style={styles.btnDelete}>
        <Text style={styles.btnText}>Delete</Text>
      </View>
    </TouchableOpacity>
  );

  const alertAction = (index, action) => {
    Alert.alert(`This is row ${index + 1} for ${action}`);
  };

  return (
    <ScreenWraper>
      <ScrollView>
        <View className="flex justify-between h-full mx-4 mt-10">
          <View>
          <View>
            <View className="relative flex-row justify-between items-center p-4">
              <View className=" absolute top-0 bottom-5 left-0 z-10">
                <BackButton/>
              </View>
              <Text className={`${color} text-xl font-bold text-center mt-5`}>Student Binnacle</Text>
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
                        data={cellIndex >= 3 ? (cellIndex = deleteButton(rowData, index)) : cellData}
                        textStyle={styles.text}
                        style={[styles.cell, {flex: (cellIndex === 0 ? 2 : 2)}]} // Adjust cell flex based on content
                      />
                    ))}
                  </TableWrapper>
                ))}
              </Table>
            </View>
            <View className="p-4">
              <Text className={`${color} text-xl font-bold text-center mt-5`}>Select Your Course</Text>
              <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={categories}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setCategory(item.label);
                setIsFocus(false);
              }}
              />
              <Text className={`${color} text-xl font-bold text-center mt-5`}>Type your Name</Text>
              <TextInput value={compNumb} onChangeText={value=> setCompNumb(value)} className=" bg-white rounded-full mt-3"/>
              <Text className={`${color} text-xl font-bold text-center mt-5`}>Select a Computer</Text>
              <Dropdown
              className=""
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={categories}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setCategory(item.label);
                setIsFocus(false);
              }}
              />
            </View>
            <View>
              <TouchableOpacity onPress={{}} style={{backgroundColor: color.button}} className="my-6 rounded-full p-3 shadow-sm mx-2">
                <Text className="text-center text-white text-lg font-bold"> Save</Text>
              </TouchableOpacity>
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
    btnDelete: {
    width: screenWidth * 0.15, // Responsive width
    height: 35, // Larger touch area
    backgroundColor: '#DB5461',
    borderRadius: 2,
    justifyContent: 'center',
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
  dropdown: {
    marginTop: 25,
    height: 50,
    borderColor: 'blue',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
