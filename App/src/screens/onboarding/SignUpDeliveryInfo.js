import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppColors from '../../config/colors';
import {Formik} from 'formik';
import * as yup from 'yup';
import {cities} from '../../config/cities';

const UserLocationSchema = yup.object({
  houseNo: yup.string().required(),
  streetName: yup.string().required('Street name cannot be empty'),
  suburb: yup.string().required(),
  city: yup.string(),
  deliveryInstructions: yup.string(),
});

const SignUpDeliveryInfo = ({navigation}) => {
  const [delInstructions, setDelInstructions] = useState('');
  const [instructionWordCount, setInstructionWordCount] = useState(0);
  const [addressCheckbox, setAddressCheckbox] = useState(true);
  const [suburb, setSuburb] = useState('');
  const [city, setCity] = useState('');
  const [suburbs, setsuburbs] = useState([]);

  const onChangeInstructions = text => {
    setDelInstructions(text);
    setInstructionWordCount(delInstructions.length);
  };

  const findSuburbs = itemValue => {
    const selectedCity = cities.find(scity => scity.label == itemValue);
    setsuburbs(selectedCity.suburbs);
  };

  const initialValues = {
    houseNo: '',
    streetName: '',
    suburb: '',
    deliveryInstructions: '',
    city: '',
  };

  const navigateToNextPage = () => {
    navigation.navigate('ContinueToHome');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Delivery Information</Text>
        <Text style={styles.headerDesc}>
          Please enter your delivery location details below
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={UserLocationSchema}
          onSubmit={values => {
            values.suburb = selectedSuburb;
            navigateToNextPage();
          }}>
          {props => (
            <View>
              <View style={styles.formRow}>
                <View style={styles.firstCol}>
                  <View style={styles.col1}>
                    <Text style={styles.inputTitles}>House No.</Text>
                    <TextInput
                      value={props.values.houseNo}
                      onChangeText={props.handleChange('houseNo')}
                      style={styles.formInput}
                    />
                  </View>
                </View>
                <View style={styles.secondCol}>
                  <View style={styles.col2}>
                    <Text style={styles.inputTitles}>Street Name</Text>
                    <TextInput
                      value={props.values.streetName}
                      onChangeText={props.handleChange('streetName')}
                      style={styles.formInput}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.streetName && props.errors.streetName}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formCol}>
                  <Text style={styles.inputTitles}>City</Text>
                  <View style={styles.titlePicker}>
                    <Picker
                      itemStyle={styles.pickerItem}
                      selectedValue={city}
                      onValueChange={(itemValue, itemIndex) => {
                        setCity(itemValue);
                        findSuburbs(itemValue);
                      }}>
                      {cities.map(scity => (
                        <Picker.Item
                          label={scity.label}
                          value={scity.value}
                          key={scity.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formCol}>
                  <Text style={styles.inputTitles}>Suburb</Text>
                  <View style={styles.titlePicker}>
                    <Picker
                      itemStyle={styles.pickerItem}
                      selectedValue={suburb}
                      onValueChange={(itemValue, itemIndex) =>
                        setSuburb(itemValue)
                      }>
                      {suburbs.map(ssuburb => (
                        <Picker.Item
                          label={ssuburb.label}
                          value={ssuburb.value}
                          key={ssuburb.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formCol}>
                  <Text style={styles.inputTitles}>Delivery Instructions</Text>
                  <TextInput
                    style={styles.formInput}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={text => onChangeInstructions(text)}
                    value={delInstructions}
                    onChangeText={props.handleChange('deliveryInstructions')}
                  />
                  <Text style={{textAlign: 'right'}}>
                    {instructionWordCount}/120
                  </Text>
                </View>
              </View>
              <View style={styles.formRow}>
                <Text style={{fontSize: 12, marginTop: -10}}>
                  (Provide information relevant to the delivery i.e. landmarks
                  near your home, call before delivery, times to avoid delivery,
                  etc.)
                </Text>
              </View>
              <View style={[styles.formRow, styles.formCheckBox]}>
                <CheckBox
                  disabled={false}
                  value={addressCheckbox}
                  onValueChange={newValue => setAddressCheckbox(newValue)}
                  tintColors={{
                    true: AppColors.primaryGreen,
                    false: AppColors.primaryGreen,
                  }}
                />
                <Text>Set as default address</Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={props.handleSubmit}
                  style={styles.nextBtn}>
                  <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default SignUpDeliveryInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.6,
  },
  headerDesc: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  formRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  formCol: {
    flexDirection: 'column',
    flex: 1,
  },
  firstCol: {
    flex: 1,
    paddingRight: 4,
  },
  secondCol: {
    flex: 3,
  },
  col1: {
    flexDirection: 'column',
  },
  col2: {
    flexDirection: 'column',
  },
  errorText: {
    fontSize: 12,
    color: AppColors.crimson,
    marginBottom: -10,
  },
  inputTitles: {
    fontSize: 14,
  },
  formInput: {
    borderWidth: 0.6,
    padding: 10,
    borderRadius: 6,
    fontSize: 15,
    borderColor: AppColors.primaryGreen,
  },
  titlePicker: {
    borderWidth: 0.6,
    borderRadius: 6,
    borderColor: AppColors.primaryGreen,
  },
  pickerItem: {
    backgroundColor: AppColors.lightergrey,
    fontSize: 18,
  },
  formCheckBox: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  nextBtn: {
    flex: 1,
    backgroundColor: AppColors.primaryGreen,
    color: AppColors.white,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 12,
    elevation: 2,
  },
  nextBtnText: {
    color: AppColors.white,
    fontSize: 18,
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
