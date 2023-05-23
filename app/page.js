"use client"; 

import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';

function SearchBar({filterText, onFilterTextChange}) {
  return (
    <form>
      <p>Procure uma mensagem</p>
      <input style={{width:"100%"}}
        type="text" value={filterText} placeholder="Search..." 
        onChange={ (e) => onFilterTextChange(e.target.value) }/>
    </form>
  );
}

function MessageRow({ message }) {
  //Mudei a forma que pega evento, se vai funcionar? Não sei
  return (
    <tr onclick={(e) => getCity(e.td[1].value)}> 
      <td>{message[0]}</td>
      <td>{message[1]}</td>
      <td>{message[2]}</td>
    </tr>
  );
}

function FilterableMessageTable({ messages }) {
  const [filterText, setFilterText] = useState('');
  const rows = [];

  messages.forEach((message) => {
    const messageText = message.toString();
    if (messageText.toLowerCase().indexOf(filterText.toLowerCase()) === -1 ){
      return;
    }
  
    rows.push(
      <MessageRow
        message={message}
        key={`${message[1]}-${message[0]}`}
      />
    );
  });

  return (
    <div>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
      <table>
        <thead>
          <tr>
            <th>Cidade</th>
            <th>Código</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}


export default function Home() {
    
  const [blogMessages, setBlogMessages] = useState([]);
  var op = 0;
  fetch("https://script.google.com/macros/s/AKfycbybzO8Wk0j8lU8jExj9mbdv7EaEu38lbG95uDg5R3lxAejbx9Jvvv5nS9YMp1_NsoaYCA/exec?op="+op)
    .then(response => response.json())
    .then(data => {
      setBlogMessages(data);
    });
    
    return (
      <main className={styles.main}>
        <FilterableMessageTable messages={blogMessages} />
      </main>
    );

}
// Mudei daqui pra baixo, seguindo a lógica, mas sem teste
function wheREterDados({ city }) {
  const [filterText, setFilterText] = useState('');
 

  return (
    <div>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
      <table>
        <thead>
          <tr>
            <th>Cidade</th>
            <th>Código</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{city.temp_max}</th>
            <th>{city.temp_min}</th>
            <th>{city.umidade_max}</th>
            <th>{city.umidade_min}</th>
            <th>{city.estacao}</th>
            <th>{city.resumo}</th>
          </tr>  
          <tr>
            <th>{city.nascer}</th>
            <th>{city.ocaso}</th>
            <th>{city.dir_vento}</th>
            <th>{city.int_vento}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


function getCity(code){
  const [cityInfo, setCityInfo] = useState([]);
  var op = 1;
  fetch("https://script.google.com/macros/s/AKfycbybzO8Wk0j8lU8jExj9mbdv7EaEu38lbG95uDg5R3lxAejbx9Jvvv5nS9YMp1_NsoaYCA/exec?op="+op+"&code="+code)
    .then(response => response.json())
    .then(data => {
      setCityInfo(data);
    });
    
    return (
      <main className={styles.main}>
        <FilterableMessageTable messages={blogMessages} />
        <wheREterDados city={cityInfo}/>
      </main>
    );
}
