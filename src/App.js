import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react'
import axios from 'axios'
import IndexRouter from './router/IndexRouter';
function App() {
  // useEffect(()=>{
  //   axios.get("/api/mmdb/movie/v3/list/hot.json?ct=北京&ci=1&channelId=4").then(res=>{
  //     console.log(res.data)
  //   })
  // },[])
  return (
      <IndexRouter></IndexRouter>
   
  );
}

export default App;
