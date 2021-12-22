import React from "react"
import { Route } from "react-router-dom"
import { Switch,Redirect } from "react-router-dom"
import SlideMenu from "../../components/sandbox/SlideMenu"
import TopHeader from "../../components/sandbox/TopHeader"
import Home from "./home/home"
import NoPermission from "./nopermission/NoPermission"
import RightList from "./right-manage/RightList"

import RoleList from "./right-manage/RoleList"
import UserList from "./user-manage/UserList"
import { Layout} from 'antd';
import './NewsSandBox.css'
const { Content } = Layout;

export default function NewsSandBox(){
    return(
        <Layout>
            <SlideMenu></SlideMenu>
            <Layout className="site-layout">
              <TopHeader></TopHeader>
            <Content
               className="site-layout-background"
               style={{
               margin: '24px 16px',
               padding: 24,
               minHeight: 280,
              }}
            >
              <Switch>
                  <Route path="/home" component={Home}></Route>
                  <Route path="/user-manage/list" component={UserList}></Route>
                  <Route path="/right-manage/role/list" component={RoleList}></Route>
                  <Route path="/right-manage/right/list" component={RightList}></Route>
                  {/* 避免输入/时不跳转到任何页面，此处利用重定向跳到home页面 */}
                  <Redirect from="/" to="/home" exact></Redirect>
                  {/* 如果不是跳转到以上任意一个页面，那么就跳到一个404页面，注意将此处与上一个同时存在，那么必须要搭配使用exact*/}
                  <Route path="*" component={NoPermission}></Route>
              </Switch>
            </Content>
            </Layout>
        </Layout>
    )
}