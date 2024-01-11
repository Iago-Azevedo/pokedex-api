import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import Reloading from "../components/Reloading";

export const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    useEffect(() => getPokemons(), []);

    const getPokemons = () => {
        var endpoints = []
        for (let i = 1; i <= 1000; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }
        axios
            .all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then((res) => setPokemons(res))
            .catch((err) => console.log(err))
    }

    const pokemonFilter = (name) => {
        var filterPokemons = [];
        if (name === "") {
           getPokemons();
        }
        for (var i in pokemons) {
            if (pokemons[i].data.name.includes(name)) {
                filterPokemons.push(pokemons[i]);
            }
        }
        console.log(filterPokemons)
        setPokemons(filterPokemons);
    }

    return (
        <div>
            <Navbar pokemonFilter={pokemonFilter} />
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    {pokemons.length === 0 ? (
                        <Reloading />
                    ) : (
                        pokemons.map((pokemon, key) => (
                            <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                                <PokemonCard
                                    name={pokemon.data.name}
                                    image={pokemon.data.sprites.front_default}
                                    types={pokemon.data.types}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </div>
    )
}