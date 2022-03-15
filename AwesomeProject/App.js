import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import emptyCheck from './assest/empty.png';
import Check from './assest/check.png';

const initialValues = {
  email: '',
  password: '',
  passwordConfirm: '',
};

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const symbolRegex = /(?=.*?[#?!@$%^&*-])/;

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .lowercase()
    .email('Must be a valid email!')
    .required('Email is required!'),
  password: Yup.string()
    .matches(lowercaseRegex, 'Must include lowercase letters')
    .matches(uppercaseRegex, 'Must include uppercase letters')
    .matches(symbolRegex, 'Must include at least one symbol')
    .matches(numericRegex, 'Must include at least one number')
    .min(8, 'Minimum 8 characters required!')
    .required('Passowrd is required!'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passowrd does not match')
    .required('Required!'),
});

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Formik React Native</Text>

      <Formik
        initialValues={initialValues}
        onSubmit={values => console.log(values)}
        validationSchema={SignupSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          isValid,
          errors,
        }) => {
          return (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errors}>{errors.password}</Text>
              )}

              <View>
                <View style={styles.condition}>
                  {errors.password && errors.password.includes('characters') ? (
                    <Image source={emptyCheck} />
                  ) : (
                    <Image source={Check} />
                  )}
                  <Text>Minimum 8 characters</Text>
                </View>
                <View style={styles.condition}>
                  {errors.password && errors.password.includes('letters') ? (
                    <Image source={emptyCheck} />
                  ) : (
                    <Image source={Check} />
                  )}
                  <Text>Uppercase and lowercase letters</Text>
                </View>
                <View style={styles.condition}>
                  {errors.password && errors.password.includes('number') ? (
                    <Image source={emptyCheck} />
                  ) : (
                    <Image source={Check} />
                  )}
                  <Text>At least one number</Text>
                </View>
                <View style={styles.condition}>
                  {errors.password && errors.password.includes('symbol') ? (
                    <Image source={emptyCheck} />
                  ) : (
                    <Image source={Check} />
                  )}
                  <Text>At least one symbol</Text>
                </View>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={handleChange('passwordConfirm')}
                onBlur={handleBlur('passwordConfirm')}
                value={values.passwordConfirm}
              />
              {touched.passwordConfirm && errors.passwordConfirm && (
                <Text style={styles.errors}>{errors.passwordConfirm}</Text>
              )}
              <TouchableWithoutFeedback style={styles.btnContainer}>
                <Text style={styles.btn}>Create</Text>
              </TouchableWithoutFeedback>
            </>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  text: {
    fontWeight: '700',
    fontSize: 30,
    color: 'green',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  btn: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  errors: {
    color: 'red',
    margin: 0,
    padding: 0,
    top: 0,
    left: 0,
  },
  condition: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
