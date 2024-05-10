import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Button, {ButtonTypes} from './components/Button';

const Opreators = {
  CLEAR: 'C',
  PLUS: '+',
  MINUS: '-',
  EQUAL: '=',
  DEL: 'Del',
  PERCENT: '%',
  DIV: '/',
  MUL: '*',
  DOT: '.',
};

const App = () => {
  const windowWidth = useWindowDimensions().width;
  const width = (windowWidth - 60) / 4;
  const [result, setResult] = useState('');
  const [formula, setFormula] = useState([]);
  const [opercheck, setOpercheck] = useState(true);
  const [point, setPoint] = useState(true);
  const [equal, setEqual] = useState(false);

  // onPressDot 함수는 사용자가 소수점 버튼을 눌렀을 때의 동작을 정의합니다.
  const onPressDot = () => {
    // 결과 문자열이 비어있는 경우 함수를 종료합니다.
    if (result.length === 0) {
      return;
    }
    // 소수점을 추가할 수 있는 상태인 경우
    if (point) {
      // 현재 수식에 '.'을 추가합니다.
      setFormula(prev => [...prev, '.']);
      // 현재 결과에 '.'을 추가합니다.
      setResult(prev => prev + '.');
      // 다시 소수점을 추가할 수 없도록 상태를 변경합니다.
      setPoint(false);
    }
  };

  // onPressNumber 함수는 사용자가 숫자 버튼을 눌렀을 때의 동작을 정의합니다.
  const onPressNumber = number => {
    // 수식의 마지막 요소를 가져옵니다.
    let last = formula[formula.length - 1];
    // 이전에 '=' 버튼을 눌렀다면 새로운 계산을 시작합니다.
    if (equal) {
      // 결과와 수식을 초기화합니다.
      setResult('');
      setFormula([]);
      // 새로운 수식에 숫자를 추가합니다.
      setFormula(prev => [prev, number]);
      // 결과에 숫자를 추가합니다.
      setResult(prev => prev + number);
      // 연산자 체크 상태를 true로 설정합니다.
      setOpercheck(true);
      // '=' 버튼을 누른 상태를 false로 변경합니다.
      setEqual(false);
    } else {
      // 이전에 '=' 버튼을 누르지 않았다면 현재 수식과 결과에 숫자를 추가합니다.
      setFormula(prev => [...prev, number]);
      setResult(prev => prev + number);
      // 연산자 체크 상태를 true로 설정합니다.
      setOpercheck(true);
    }
  };

  // 연산자 버튼이 눌렸을 때 실행되는 함수를 정의합니다.
  const onPressOperator = operator => {
    // 만약 이전에 '=' 버튼이 눌렸다면,
    if (equal) {
      // 결과값을 문자열로 변환하여 formula 상태를 초기화합니다.
      setFormula([result.toString()]);
      // equal 상태를 false로 설정하여, '=' 버튼이 눌렸던 상태를 초기화합니다.
      setEqual(false);
    }

    // 연산자를 연속으로 눌렀는지 확인하는 조건입니다.
    if (opercheck) {
      // 만약 공식(formula)의 길이가 0보다 크고 결과값이 비어있지 않다면,
      if (formula.length > 0 && result !== '') {
        // 소수점 입력이 가능한 상태로 설정합니다.
        setPoint(true);
        // 현재 공식에 새로운 연산자를 추가합니다.
        setFormula(prev => [...prev, operator]);
        // 현재 결과값에 새로운 연산자를 추가합니다.
        setResult(prev => prev + operator);
      }
      // 연산자 연속 입력 상태를 false로 설정합니다.
      setOpercheck(false);
    }
  };

  const calculate = () => {
    // 결과값(result)을 평가하여 NaN(숫자가 아닌 값)인지 확인합니다.
    if (isNaN(eval(result))) {
      // 만약 결과가 숫자가 아니라면, 결과를 빈 문자열로 설정하고, 수식을 비웁니다.
      setResult('');
      setFormula([]);
    }
    // 결과값을 평가하여 무한대(Infinity)인지 확인합니다.
    else if (eval(result) == Infinity) {
      // 만약 결과가 무한대라면, 결과를 빈 문자열로 설정하고, 수식을 비웁니다.
      // 그리고 함수에서 false를 반환하여 더 이상 진행하지 않습니다.
      setResult('');
      setFormula([]);
      return false;
    }
    // 위의 조건에 해당하지 않는 경우, 즉 결과값이 유효한 숫자일 경우:
    else {
      // 결과값을 소수점 이하 두 자리로 포맷
      setResult(prev => Number(eval(result)).toFixed(2));
      // 계산이 완료되었음을 나타내기 위해 'equal' 상태를 true로 설정합니다.
      setEqual(true);
    }
  };

  // 'Clear' 버튼을 눌렀을 때 실행되는 함수입니다.
  const onPressClear = () => {
    setResult(''); // 결과값을 빈 문자열로 설정하여 화면을 초기화합니다.
    setFormula([]); // 수식을 나타내는 배열을 비워 초기화합니다.
    setPoint(true); // 소수점 입력 가능 상태로 설정합니다.
    setOpercheck(true); // 연산자 입력 가능 상태로 설정합니다.
    setEqual(false); // '=' 버튼이 눌렸는가를 나타내는 상태를 false로 설정합니다.
  };

  // 'Delete' 버튼을 눌렀을 때 실행되는 함수입니다.
  const onPressDel = () => {
    setOpercheck(true); // 연산자 입력 가능 상태로 설정합니다.
    let str = String(result).slice(0, -1); // 현재 결과값을 문자열로 변환한 뒤, 마지막 문자를 제외한 나머지 문자열을 새로운 결과값으로 설정합니다.
    setResult(prev => str); // 새로운 결과값을 설정합니다.
    let prev = formula.pop(); // 수식 배열의 마지막 요소를 제거합니다. (이 때 제거된 요소는 사용되지 않습니다.)
    setFormula(prev => [...prev]); // 변경된 수식 배열을 다시 설정합니다.
  };

  // onPressPercent 함수는 사용자가 백분율(%) 버튼을 눌렀을 때 호출됩니다.
  const onPressPercent = () => {
    // formula 배열에 항목이 있고, result가 빈 문자열이 아닌 경우에만 실행
    if (formula.length > 0 && result !== '') {
      // formula 배열에 '%'를 추가
      setFormula(prev => [...prev, '%']);
      // result를 100으로 나눈 값을 계산하여 setResult를 통해 상태 업데이트
      setResult(eval(result) / 100);
    }
    // 소수점 입력이 가능한 상태로 변경
    setPoint(false);
  };

  // resultView 함수는 계산기의 결과를 화면에 표시하는 형식을 결정합니다.
  const resultView = () => {
    // 'equal' 상태가 false일 경우, 현재 result 값을 그대로 반환
    if (!equal) {
      return result;
    } else {
      // result 값을 문자열로 변환하여 소수점으로 분리
      const decimalPart = result.toString().split('.')[1];
      const integerPart = result.toString().split('.')[0];
      // 정수 부분에 대해 3자리마다 콤마(,)를 추가하여 포맷팅
      const formattedDecimal = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ',',
      );
      // 소수점 부분이 있는 경우, 정수 부분과 소수점 부분을 조합하여 반환
      if (decimalPart) {
        return `${formattedDecimal}.${decimalPart}`;
      } else {
        // 소수점 부분이 없는 경우, 포맷팅된 정수 부분만 반환
        return `${formattedDecimal}`;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" />

      <View style={styles.formulaContainer}>
        <Text style={styles.text2}>{formula}</Text>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.text}>{resultView(result)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.left}>
          <View style={styles.topArea}>
            <Button
              title={Opreators.CLEAR}
              onPress={() => onPressClear()}
              buttonStyle={{width: width, height: width, marginTop: 20}}
              buttonType={ButtonTypes.OPERATOR}
            />
            <Button
              title={Opreators.DEL}
              onPress={() => onPressDel()}
              buttonStyle={{width: width, height: width, marginTop: 20}}
              buttonType={ButtonTypes.OPERATOR}
            />
            <Button
              title={Opreators.PERCENT}
              onPress={() => onPressPercent()}
              buttonStyle={{width: width, height: width, marginTop: 20}}
              buttonType={ButtonTypes.OPERATOR}
            />
          </View>
          <View style={styles.number}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <Button
                key={num}
                title={num.toString()}
                onPress={() => onPressNumber(num)}
                buttonStyle={{width: width, height: width, marginTop: 10}}
                buttonType={ButtonTypes.NUMBER}
              />
            ))}
          </View>
          <View style={styles.bottomArea}>
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonStyle={{
                width: width * 2 + 10,
                height: width,
              }}
              buttonType={ButtonTypes.NUMBER}
            />
            <Button
              title={Opreators.DOT}
              onPress={() => onPressDot()}
              buttonStyle={{width: width, height: width}}
              buttonType={ButtonTypes.OPERATOR}
            />
          </View>
        </View>

        <View>
          <Button
            title={Opreators.DIV}
            onPress={() => onPressOperator(Opreators.DIV)}
            buttonStyle={{width: width, height: width, marginTop: 20}}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Opreators.MUL}
            onPress={() => onPressOperator(Opreators.MUL)}
            buttonStyle={{width: width, height: width, marginTop: 10}}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Opreators.MINUS}
            onPress={() => onPressOperator(Opreators.MINUS)}
            buttonStyle={{width: width, height: width, marginTop: 10}}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Opreators.PLUS}
            onPress={() => onPressOperator(Opreators.PLUS)}
            buttonStyle={{width: width, height: width, marginTop: 10}}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Opreators.EQUAL}
            onPress={() => calculate()}
            buttonStyle={{width: width, height: width, marginTop: 10}}
            buttonType={ButtonTypes.OPERATOR}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  formulaContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  resultContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderWidth: 3,
    borderColor: '#0F40C8',
    borderRadius: 30,
    marginVertical: 30,
    marginHorizontal: 10,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#E4F0F5',
    justifyContent: 'space-evenly',
  },
  topArea: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  left: {
    width: '75%',
  },
  bottomArea: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
  },
  text: {
    fontSize: 60,
    fontWeight: '700',
    color: '#52494C',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text2: {
    fontSize: 25,
    color: 'black',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  number: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});

export default App;
