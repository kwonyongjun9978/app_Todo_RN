import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TouchableHighlight,
  TouchableWithoutFeedback, 
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import { theme } from "./colors";
import { useState } from 'react';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if(text === ""){
      return
    }
    // save to do
    //3개의 object를 결합하기위해 Object.assign(Hash Table)사용, 합쳐진후 새로운 object를 return
    const newToDos = Object.assign(
      {}, 
      toDos, //기존 object
      {[Date.now()]: {text, work: working}} //추가 object
    );
    setToDos(newToDos);
    setText("");
  };
  console.log(toDos);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
        <TextInput 
          returnKeyType='done'
          onSubmitEditing={addToDo}
          value={text}
          autoCapitalize={'sentences'}
          onChangeText={onChangeText}
          placeholderTextColor='pink'
          placeholder={working ? "Add a To Do" : "Where do you want to go?"} 
          style={styles.input}
        />
        <ScrollView>
          {Object.keys(toDos).map((key) => (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
            ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,

  },
  header:{
    justifyContent: "space-between",
    flexDirection:'row',
    marginTop: 100,

  },
  btnText:{
    fontSize: 38,
    fontWeight: '600',
    color: 'white',
  },
  input:{
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,

  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    
  },

});
