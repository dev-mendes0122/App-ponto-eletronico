import React, {useState} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [nextId, setNextId] = useState(1); // ID inicial

  const handleAdd = () => {
    if(username && password){
      // Adiciona o novo item com o proximo ID
      setData([...data, {id: nextId, username, password}]);
      setNextId(nextId + 1); // incrementa o ID
      setUsername('');
      setPassword('');

    }
  }

  return(
    <View style = {{flex: 1, padding: 20}}>
    <TextInput
    style={{ borderWidth: 1, marginBottom: 10, padding: 8}}
    placeholder="nome de usuario"
    value={username}
    onChangeText={setUsername}
    />
    <TextInput
    style={{ borderWidth: 1, marginBottom: 10, padding: 8}}
    placeholder="Digite sua senha"
    secureTextEntry
    value={password}
    onChangeText={setPassword}
    />

    <Button title="Adicionar" onPress={handleAdd} />
    <FlatList
    style={{marginTop: 20}}
    data={data}
    keyExtractor={item => item.id.toString()} // convert o id para string
    renderItem={({ item }) => (
      <Text style={{fontSize: 16 }}>
      ID: {item.id} | Usuario: {item.username} | Senha: {item.password}
      </Text>

    )}

    />
    </View>

  );

}