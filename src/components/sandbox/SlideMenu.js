import React, { Children, useEffect, useState } from "react"
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
  } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import "./index.css"
import axios from "_axios@0.24.0@axios";
  const {Sider}=Layout
  const { SubMenu } = Menu;

  //模拟数组结构
//   const menuList=[{
//       key:"/home",
//       title:"首页",
//       icon:<UserOutlined />
//   },
//   {
//     key:"/user-manage",
//     title:"用户管理",
//     icon:<UserOutlined />,
//     children:[
//         {
//             key:"/user-manage/list",
//             title:"用户列表",
//             icon:<UserOutlined />,
//         }

//     ]
// },
// {
//     key:"/right-manage",
//     title:"权限管理",
//     icon:<UserOutlined />,
//     children:[
//         {
//             key:"/right-manage/role/list",
//             title:"权限列表",
//             icon:<UserOutlined />,
//         },
//         {
//             key:"/right-manage/right/list",
//             title:"角色列表",
//             icon:<UserOutlined/>,
//         },

//     ]
// },

// ]

// 

 function SlideMenu(props){

    const [menu,setMenu]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/rights?_embed=children").then(res=>{
            // console.log(res.data)
            setMenu(res.data)
        })
    },[])

    const checkPagePermission=(item)=>{
        return item.pagepermisson===1  

    }

//&& checkPagePermission(item)
// 
    const renderMenu=(menuList)=>{
        return menuList.map(item=>{
            if(item.children?.length&&checkPagePermission(item)){
                return <SubMenu key={item.key} icon={<UserOutlined/>} title={item.title}>
                    {/* 此处是递归调用 */}
                    {renderMenu(item.children)}
                </SubMenu>
            }
            return checkPagePermission(item)&&<Menu.Item key={item.key} icon={<UserOutlined/>}
             onClick={()=>{
                props.history.push(item.key)
            }}>{item.title}</Menu.Item>
        })
    }
    // console.log(props.location.pathname)
    const selectKeys=[props.location.pathname]
    const openKeys=["/"+props.location.pathname.split("/")[1]]
    return(
        <Sider trigger={null} collapsible collapsed={false}>
          <div style={{display:"flex",height:"100%","flexDirection":"column"}}>
          <div className="logo" >全球新闻发布管理软件</div>
          {/* defaultSelectedKeys是默认选中的值 */}
          <Menu theme="dark" mode="inline" defaultSelectedKeys={selectKeys} defaultOpenKeys={openKeys}>
              
              {renderMenu(menu)}
            {/* <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="用户管理">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu> */}
          </Menu>
          </div>
        </Sider>
    )
}

export default withRouter(SlideMenu)