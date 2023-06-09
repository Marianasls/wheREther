"use client"; 

import React, { useState, useEffect } from 'react';
import addDays from 'date-fns/addDays';
import styles from './page.module.css';

import "react-datepicker/dist/react-datepicker.css";

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

  return (
    
    <div className={styles.box}>
      
      <h1 >Lista de Cidades</h1>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">Selecione uma cidade</option>
        {cities.map((city) => (
          <option key={city[0]} value={city[1]}>{city[0]}</option>
        ))}
      </select>
      
      {selectedCity && (
        <div className={styles.box}>
          <br /><h2>Informações de Clima para {cities.find((value)=>value[1]==selectedCity)[0]}</h2><br />
          <h2>UF: {weatherData['uf']}</h2>
          
          {Object.entries(keys1).map(([key,value]) => (
            <div key={key} className={styles.box}>
              <h3 key={key}>Dia: {value[0]}</h3>          
              
              {Object.entries([value[1]][0]).map(([turnoKey,turnoValue]) => (
                <div key={turnoKey} className={styles.retangle}>
                  
                  <br /><h3>Informações primarias da {turnoKey}</h3><br />
                  <div className={styles.circle}>
                    
                    <p>Temperatura máxima: {[value[1]][0][turnoKey].temp_max} °C</p><br />
                    <p>Temperatura mínima: {[value[1]][0][turnoKey].temp_min} °C</p><br />
                    <p>Estação: {[value[1]][0][turnoKey].estacao}</p> <br />
                    <p>Resumo: {[value[1]][0][turnoKey].resumo}</p><br />
                    <p>Umidade máxima: {[value[1]][0][turnoKey].umidade_max} %</p><br />
                    <p>Umidade mínima: {[value[1]][0][turnoKey].umidade_min} %</p><br />
                  </div>
                  <br /><h3>Informações secundárias da {turnoKey}</h3><br />
                  <div className={styles.circle}>
                    
                    <p>Tendência: {[value[1]][0][turnoKey].temp_max_tende} </p><br />
                    <p>Nascer do sol: {[value[1]][0][turnoKey].nascer} </p><br />
                    <p>Pôr do sol: {[value[1]][0][turnoKey].ocaso} </p><br />
                    <p>Direção do vento: {[value[1]][0][turnoKey].dir_vento} </p><br />
                    <p>Intenção do vento: {[value[1]][0][turnoKey].int_vento} </p><br />
                  </div>

                </div>
              ))}              
            </div>
          ))}
          {Object.entries(keys2).map(([keyDia,value]) => (
            <div key={keyDia} className={styles.box}>
              <h3 key={keyDia}>Dia: {value[0]}</h3>         
                            
              <div className={styles.retangle}>
                <br /><h3>Informações principais do dia inteiro</h3><br />
                <div className={styles.circle}>
                  
                  <p>Temperatura máxima: {[value[1]][0].temp_max} °C</p><br />
                  <p>Temperatura mínima: {[value[1]][0].temp_min} °C</p><br />
                  <p>Estação: {[value[1]][0].estacao}</p> <br />
                  <p>Resumo: {[value[1]][0].resumo}</p><br />
                  <p>Umidade máxima: {[value[1]][0].umidade_max} %</p><br />
                  <p>Umidade mínima: {[value[1]][0].umidade_min} %</p><br />
                </div>
                <br /><h3>Informações secundárias do dia inteiro</h3><br />
                <div className={styles.circle}>
                 
                  <p>Tendência: {[value[1]][0].temp_max_tende} </p><br />
                  <p>Nascer do sol: {[value[1]][0].nascer} </p><br />
                  <p>Pôr do sol: {[value[1]][0].ocaso} </p><br />
                  <p>Direção do vento: {[value[1]][0].dir_vento} </p><br />
                  <p>Intenção do vento: {[value[1]][0].int_vento} </p><br />
                </div>

              </div>             
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Page;
