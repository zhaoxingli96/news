import React from "react"
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import Login from "../views/login/login"
import NewsSandBox from "../views/sandbox/NewsSandBox"


export default function IndexRouter(){
    return(
        <HashRouter>
             {/* switch可实现精确匹配 */}
             <Switch>
            <Route path="/login" component={Login}></Route>       
            {/* <Route path="/" component={NewsSandBox}></Route> */}
            <Route path="/" render={()=>
                localStorage.getItem('token')?<NewsSandBox></NewsSandBox>:<Redirect to="/login"></Redirect>}></Route>
               

            </Switch>
           

        </HashRouter>
          
            
      

    )
}