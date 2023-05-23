"use client"; 

import React, { useState, useEffect } from 'react';

const Page = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // Função para buscar a lista de cidades 
    const fetchCities = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbybzO8Wk0j8lU8jExj9mbdv7EaEu38lbG95uDg5R3lxAejbx9Jvvv5nS9YMp1_NsoaYCA/exec?op=0');
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Erro ao buscar as cidades:', error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    // Função para buscar as informações de clima
    const fetchWeatherData = async () => {
      try {
        if (selectedCity) {
          const code = selectedCity;
          const response = await fetch('https://script.google.com/macros/s/AKfycbybzO8Wk0j8lU8jExj9mbdv7EaEu38lbG95uDg5R3lxAejbx9Jvvv5nS9YMp1_NsoaYCA/exec?op=1&code='+code);
          const data = await response.json();
          console.log(JSON.parse(data));
          setWeatherData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Erro ao buscar as informações de clima:', error);
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1>Lista de Cidades</h1>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">Selecione uma cidade</option>
        {cities.map((city) => (
          <option key={city[0]} value={city[1]}>{city[0]}</option>
        ))}
      </select>
      
      {selectedCity && (
        <div>
          <h2>Informações de Clima para {cities.find((value)=>value[1]==selectedCity)[0]}</h2>
          <p>UF: {weatherData['uf']}</p>
          {Object.keys(weatherData).map(date => (
            <div key={date}>
              <h3>Temperatura do dia: {date}</h3>
              {Object.keys(date).map(turno => (
                <div key={turno}>
                  <h4>{turno}</h4> 
                  <p>{weatherData[date][turno]} °C</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Page;