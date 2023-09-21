import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (isMounted) {
          setPokemonData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [pokemonId]);

  const handleNextPokemon = () => {
    if (pokemonId < 151) {
      setPokemonId(pokemonId + 1);
    }
  };

  const handlePrevPokemon = () => {
    if (pokemonId > 1) {
      setPokemonId(pokemonId - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.pokemonContainer, { backgroundColor: '#BBDEC6' }]}>
        {pokemonData && (
          <>
            <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png` }} style={styles.pokemonImage} />
            <Text style={styles.pokemonName}>{`${pokemonData.id}. ${pokemonData.name}`}</Text>
          </>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.navButtons}>
          <TouchableOpacity style={[styles.button, styles.largeButton]} onPress={handlePrevPokemon}>
            <Text style={styles.buttonText}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.largeButton, { marginLeft: 10 }]} onPress={handleNextPokemon}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.button, styles.infoButton]} onPress={() => navigation.navigate('PokemonDetail', { name: pokemonData.name })}>
          <Text style={styles.buttonText}>Informação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#314c53',
    padding: 20,
    paddingTop: 0,
    justifyContent: 'center',
  },
  pokemonContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#5A7F78',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  largeButton: {
    flex: 1,
  },
  infoButton:{
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
