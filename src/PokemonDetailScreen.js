import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PokemonDetailScreen = () => {
  const route = useRoute();
  const { name } = route.params;
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(data => setPokemonData(data))
      .catch(error => console.error(error));
  }, [name]);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundSquare}></View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {pokemonData && (
          <>
            <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png` }} style={styles.pokemonImage} />
            <Text style={styles.pokemonName}>{pokemonData.name}</Text>
            <Text style={styles.detailText}>Número da Pokédex: {pokemonData.id}</Text>
            <Text style={styles.detailText}>Altura: {pokemonData.height / 10} metros</Text>
            <Text style={styles.detailText}>Peso: {pokemonData.weight / 10} kg</Text>
            <Text style={styles.detailText}>Tipo:</Text>
            {pokemonData.types.map((type, index) => (
              <Text key={index} style={styles.detailText}>{type.type.name}</Text>
            ))}
            <Text style={styles.detailText}>Habilidades:</Text>
            {pokemonData.abilities.map((ability, index) => (
              <Text key={index} style={styles.detailText}>{ability.ability.name}</Text>
            ))}
            <Text style={styles.detailText}>Estatísticas:</Text>
            {pokemonData.stats.map((stat, index) => (
              <Text key={index} style={styles.detailText}>
                {stat.stat.name}: {stat.base_stat}
              </Text>
            ))}
            <Text style={styles.detailText}>Forte contra:</Text>
            {pokemonData.types.map((type, index) => (
              <Text key={index} style={styles.detailText}>
                {type.type.name === 'normal' ? 'nenhum' : type.type.name}
              </Text>
            ))}
            {/* Adicione mais informações aqui */}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#314c53',
    position: 'relative',
    padding: 16,
  },
  backgroundSquare: {
    position: 'absolute',
    marginTop: 16,
    marginLeft: 80,
    width: '65%',
    height: '100%',
    backgroundColor: '#bbdec6',
    borderRadius: 10,
  },
  contentContainer: {
    alignItems: 'center',
  },
  pokemonImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "black",
  },
  detailText: {
    fontSize: 18,
    marginBottom: 12,
    color: "black",
  },
});

export default PokemonDetailScreen;
