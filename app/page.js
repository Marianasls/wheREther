"use client"; 

import React, { useState, useEffect } from 'react';
import addDays from 'date-fns/addDays'

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//import 'bootstrap/dist/css/bootstrap.min.css';

const Page = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const currentDate = new Date(); // Data atual
  const maxDate = addDays(currentDate, 2); // Adiciona dois dias à data atual

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
          const data_weather = await response.json();
          console.log(JSON.parse(data_weather));
          setWeatherData(JSON.parse(data_weather));
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

  const keys = Object.entries(weatherData);
  const keys1 = keys.slice(0,2);
  const keys2 = keys.slice(2,5);
  
  console.log(maxDate);
  console.log(keys1);
  console.log(keys2);

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
          <br /><h2>Informações de Clima para {cities.find((value)=>value[1]==selectedCity)[0]}</h2><br />
          <p>UF: {weatherData['uf']}</p>
          
          {Object.entries(keys1).map(([key,value]) => (
            <div key={key}>
              <h3 key={key}>Dia: {value[0]}</h3>
              {console.log(value[0])} {/**dia */}
              {console.log(key)} 
              {/** objeto value[1] 
              
              {Object.entries(keys1[key]).map(([turno,turnoValue]) => (
                <div key={turno}>
                  <br /><h4>{turno}</h4> <br />
                  <div className='primaria'>
                    <p>Temperatura máxima: {keys1[key][turno].temp_max} °C</p><br />
                    <p>Temperatura mínima: {keys1[key][turno].temp_min} °C</p><br />
                    <p>Estação: {keys1[key][turno].estacao}</p> <br />
                    <p>Resumo: {keys1[key][turno].resumo}</p><br />
                    <p>Umidade máxima: {keys1[key][turno].umidade_max} %</p><br />
                    <p>Umidade mínima: {keys1[key][turno].umidade_min} %</p><br />
                  </div>
                  <div className='secundária'>
                    <p>Tendência: {keys1[date][turno].temp_max_tende} </p><br />
                    <p>Nascer do sol: {keys1[date][turno].nascer} </p><br />
                    <p>Pôr do sol: {keys1[date][turno].ocaso} </p><br />
                    <p>Direção do vento: {keys1[date][turno].dir_vento} </p><br />
                    <p>Intenção do vento: {keys1[date][turno].int_vento} </p><br />
                  </div>

                </div>
              ))}
              */}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Page;