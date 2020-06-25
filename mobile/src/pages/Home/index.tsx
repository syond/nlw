import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, ImageBackground, Picker } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';


interface IBGEUFResponse {
  sigla: string,
}

interface IBGECityResponse {
  nome: string,
}


export default function Home() {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSeelectedCity] = useState('0');


  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cityName = response.data.map(city => city.nome);

      setCities(cityName);
    });
  }, [selectedUf]);


  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      selectedUf,
      selectedCity,
    });
  }

  function handleSelectUf(value: string) {
    const uf = value;

    setSelectedUf(uf);
  }

  function handleSelectCity(value: string) {
    const city = value;

    setSeelectedCity(city);
  }


  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.select}>
          <RNPickerSelect
            onValueChange={(value) => handleSelectUf(value)}
            //pickerProps={{style: styles.input}}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                height: 60,
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }
            }}
            Icon={() => {
              return <Icon name="chevron-down" size={18} color="gray" />;
            }}
            useNativeAndroidPickerStyle={false}
            doneText="Selecionar"
            placeholder={{
              label: 'Selecione um estado',
              value: null,
              color: '#9EA0A4',
            }}
            items={[] = (ufs.map(uf => (
              {
                key: uf,
                label: uf,
                value: uf,
              }
            )))}
          />

          <RNPickerSelect
            onValueChange={(value) => handleSelectCity(value)}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                height: 60,
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }
            }}
            Icon={() => {
              return <Icon name="chevron-down" size={18} color="gray" />;
            }}
            doneText="Selecionar"
            placeholder={{
              label: 'Selecione uma cidade',
              value: null,
              color: '#9EA0A4',
            }}
            items={[] = (cities.map(city => (
              {
                key: city,
                label: city,
                value: city,
              }
            )))}
          />
        </View>

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {
    marginBottom: 20,
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 24,
    fontSize: 16,
  },
});
