import React, { Component } from 'react';
import { View, Alert, Image, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity, LayoutAnimation, Platform } from 'react-native';
//
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

const { height, width } = Dimensions.get('window');
const CustomLayoutAnimation = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

const theme = {
  accent: '#ffc107',
  bg: '#212121',
  text: 'white',
  font: 'OpenSans',
};

export default class BudgetSection extends Component {

  constructor() {
    super();
    this.state = {
      budget: 0,
      totalExpenses: 0,
      progress: 0,
      budgetValueChange: '',
      budgetModalOffset: height * 0.3,
      error: 'transparent',
    };
  }

  componentWillMount() {
    this.setBudget();
    this.setTotalExpenes();
  }

  async setBudget() {
    try {
      const _this = this;
      const uid = this.props.Firebase.auth().currentUser.uid;
      const ref = this.props.Firebase.database().ref();
      const userBudgetRef = ref.child('userReadable/userBudget').child(uid);

      await userBudgetRef.once('value').then((snap) => {
        const value = snap.val().budget;
        return value;
      }).then((response) => {
        _this.setState({
          budget: response,
        });
        _this.props.setBudget(response);
      });
    } catch (e) {
    }
  }

  async setTotalExpenes() {
    try {
      const _this = this;
      const uid = this.props.Firebase.auth().currentUser.uid;
      const ref = this.props.Firebase.database().ref();
      const userTotalExpensesRef = ref.child('userReadable/userTotalExpenses').child(uid);

      await userTotalExpensesRef.once('value').then((snap) => {
        const value = snap.val().expenses;
        return value;
      }).then((response) => {
        _this.setState({
          totalExpenses: response,
        });
        _this.props.setExpense(response);
      });
    } catch (e) {
    }
  }

  setProgess() {
    return (this.props.expenseTotal / this.state.budget);
  }

  async _updateBudget() {
    if (!Number.isInteger(+this.state.budgetValueChange) || +this.state.budgetValueChange <= 0) {
      this.setState({
        error: 'red',
      });
      return;
    }
    try {
      const _this = this;
      const ref = this.props.Firebase.database().ref();
      const user = this.props.Firebase.auth().currentUser;
      const uid = user.uid;
      const userBudgetRef = ref.child('userReadable/userBudget').child(uid);

      const newBudgetValue = +this.state.budgetValueChange;

      if (newBudgetValue >= 0) {
        userBudgetRef.update({ budget: newBudgetValue });
        _this.setState({
          budget: newBudgetValue,
        });
      }
    } catch (e) {
    }
    this.toggleUpdateBudget();
  }

  toggleUpdateBudget() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    dismissKeyboard();
    if (this.state.budgetModalOffset === 0) {
      this.setState({
        budgetModalOffset: height * 0.3,
        budgetValueChange: '',
        error: 'transparent',
      });
    } else {
      this.setState({
        budgetModalOffset: 0,
        budgetValueChange: '',
        error: 'transparent',
      });
    }
  }

  warning() {
    if (+this.state.budget === 0) {
      return {
        color: 'white',
        text: 'please set a budget',
      };
    } else if (this.setProgess() < 1) {
      return {
        color: 'transparent',
        text: 'budget reached',
      };
    } else if (this.setProgess() > 1) {
      return {
        color: 'red',
        text: 'budget exceeded',
      };
    }
    return {
      color: theme.accent,
      text: 'budget reached',
    };
  }

  render() {
    let progress = 0.01;
    if (this.setProgess() < 1) {
      progress = this.setProgess();
    } else if (this.setProgess() >= 1) {
      progress = 1;
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.bg}
          source={{ uri: 'https://static.pexels.com/photos/248921/pexels-photo-248921.jpeg' }}
        >
          <View style={styles.bgFilter} />
        </Image>
        <View style={styles.body}>
          <Progress.Circle
            style={styles.progressCircle}
            size={120}
            progress={progress}
            color={theme.accent}
            unfilledColor={'rgba(255,255,255,.3)'}
            borderWidth={0}
          />
          <View style={styles.textContainer}>
            <View style={{ top: 100 }}>
              <Text style={styles.expenseLabel}>
                Total Expenses
              </Text>
              <Text style={styles.value} >
                ${this.props.expenseTotal}
              </Text>
            </View>
            <View style={{ top: 0 }}>
              <Text style={styles.value} >
                ${this.state.budget}
              </Text>
              <Text style={styles.budgetLabel}>
                Budget
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonLabel}>
            update budget
          </Text>
          <TouchableOpacity onPress={this.toggleUpdateBudget.bind(this)}>
            <Icon
              name="plus-circle"
              size={40}
              color="rgba(255,255,255,1)"
              style={{ bottom: 0, backgroundColor: 'transparent' }}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.modal, { top: this.state.budgetModalOffset }]}>
          <Text style={{ color: '#bdbdbd', fontSize: 17, margin: 10, fontFamily: 'OpenSans', fontWeight: '100' }}>
            Set Budget
          </Text>
          <TextInput
            onFocus={this.props.removeBehavior}
            keyboardType="numeric"
            placeholder="$"
            placeholderTextColor="white"
            style={{ width: 100, height: 40, alignSelf: 'center', backgroundColor: 'rgba(255,255,255,.3)', margin: 10, color: 'white' }}
            onChangeText={budgetValueChange => this.setState({ budgetValueChange })}
            value={this.state.budgetValueChange}
          />
          <TouchableOpacity
            style={{ backgroundColor: 'black', width: width * 0.5, padding: 10, margin: 10, borderRadius: 10, alignItems: 'center', borderWidth: 0.5, borderColor: theme.accent }}
            onPress={this._updateBudget.bind(this)}
          >
            <Text style={{ color: theme.accent, fontFamily: 'OpenSans' }}>
              Confirm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'absolute', top: 10, right: 10 }}
            onPress={this.toggleUpdateBudget.bind(this)}
          >
            <Text style={{ color: 'white', fontFamily: 'OpenSans' }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={[styles.errors, { color: this.state.error }]}>
            invalid value
          </Text>
        </View>
        <Text style={[styles.exceed, { color: this.warning().color }]}>
          WARNING: {this.warning().text}
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: height * 0.30,
    backgroundColor: 'black',
  },
  bg: {
    position: 'absolute',
    width: null,
    height: null,
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
  bgFilter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  body: {
    top: 10,
    backgroundColor: 'transparent',
    position: 'relative',
    height: 100,
  },
  progressCircle: {
    position: 'absolute',
    top: 30,
    right: width * 0.35,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseLabel: {
    color: theme.text,
    fontSize: 10,
    left: 5,
    color: theme.accent,
  },
  budgetLabel: {
    color: theme.text,
    fontSize: 10,
    textAlign: 'right',
    right: 5,
    color: theme.accent,
  },
  value: {
    color: theme.text,
    fontSize: 40,
    fontFamily: 'OpenSans',
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLabel: {
    color: theme.text,
    margin: 10,
    fontSize: 10,
    backgroundColor: 'transparent',
  },
  modal: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  errors: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontFamily: 'OpenSans',
    fontWeight: '100',
    backgroundColor: 'transparent',
  },
  exceed: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontFamily: 'OpenSans',
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
});
