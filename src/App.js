import './App.css';
import {useEffect, useState} from 'react'

function App() {

  const [countries,setCountries] = useState([])
  const [searchWord,setSearchWord] = useState('')
  const [dataFilter] = useState(['name','capital'])

  useEffect(()=>{
    fetch(`https://restcountries.com/v3.1/all`)
    .then(res=>res.json())
    .then(data=>{
      setCountries(data)
    })
  },[])

  const searchCountries = (countries)=>{
    return countries.filter((item)=>{
      // eslint-disable-next-line array-callback-return
      return dataFilter.some((filter)=>{
        if(item[filter]){
          if(filter === 'name'){
            return item[filter].common.toString().toLowerCase().indexOf(searchWord.toLowerCase())>-1
          }else{
            return item[filter].toString().toLowerCase().indexOf(searchWord.toLowerCase())>-1
          }
        }
      })
    })
  }

  const formatNumber=(num)=> {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <div className="container">
      <div className='search-container'>
        <label htmlFor='search-form'>
          <input type='text' 
          className='search-input' 
          placeholder='ค้นหาข้อมูลประเทศที่คุณต้องการ (เมืองหลวง,ประเทศ)'
          value={searchWord}
          onChange={(e)=>setSearchWord(e.target.value)}
          />
        </label>
      </div>
      <ul className='row'>
        {searchCountries(countries).map((item,index)=>{
          return(
            <li key={index}>
            <div className='card'>
              <div className='card-title'>
                <img src={item.flags.svg} alt={item.name.common}/>
              </div>
              <div className='card-body'>
                <div className='card-description'>
                  <h2>{item.name.common}</h2>
                  <ol className='card-list'>
                    <li>ประขากร : <span>{formatNumber(item.population)}</span></li>
                    <li>ภูมิภาค : <span>{item.continents}</span></li>
                    <li>เมืองหลวง : <span>{item.capital}</span></li>
                  </ol>
                </div>
              </div>
            </div>
            </li> 
          ) 
        })}
      </ul>
    </div>
  );
}

export default App;
