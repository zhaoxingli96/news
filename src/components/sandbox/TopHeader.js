import React, { useState } from "react"
import { Layout} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';
  import { Menu, Dropdown ,Avatar} from 'antd';
  import { DownOutlined,UserOutlined } from '@ant-design/icons';



const { Header } = Layout;

export default function TopHeader(){
    // 设置初始状态
    const [collapsed,setCollapsed]=useState(false)
    const changeCollapsed=()=>{
        setCollapsed(!collapsed)
    }
    const menu = (
        <Menu>
          <Menu.Item>
              超级管理员
          </Menu.Item>
          <Menu.Item danger>退出</Menu.Item>
        </Menu>
      );
    return(
        <Header className="site-layout-background" style={{ padding: 0 }}>
        {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: this.toggle,
        })} */}
        {collapsed?<MenuUnfoldOutlined onClick={changeCollapsed}/>:<MenuFoldOutlined onClick={changeCollapsed}/>}

        <div style={{float:"right"}}>
            <span>欢迎回来admin</span>
      
         <Dropdown overlay={menu}>
         <Avatar size="large" icon={<UserOutlined />} />
      
        </Dropdown>
        </div>

      </Header>

      

    )
}

