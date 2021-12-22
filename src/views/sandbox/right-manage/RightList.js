import React, { useEffect, useState } from "react"
import axios from "_axios@0.24.0@axios"
import { Table, Tag, Space,Modal } from 'antd';
import { Button, Tooltip,Switch,Popover } from 'antd';
import { DeleteOutlined,EditOutlined,ExclamationCircleOutlined} from '@ant-design/icons';

const {confirm}=Modal
export default function RightList(){ 
    const[dataSource,setdataSource]=useState([])
    useEffect(()=>{
        axios.get(" http://localhost:3001/rights?_embed=children").then(res=>{
            const list=res.data
            list.forEach(item=>{
                if(item.children.length===0){
                    item.children=""
                }
            })
            setdataSource(res.data)
        })
    },[])
    console.log(dataSource)
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '权限名称',
          dataIndex: 'title',
          key:"title"
          }
        ,
        {
          title: '路径',
          dataIndex: 'key',
          render:(key)=>{
              return<Tag color="orange">{key}</Tag>
          }
        },
        {
            title: '操作',
            render:(item)=>{
                return <div>
                    <Button danger  shape="circle" icon={<DeleteOutlined />} onClick={()=>confirmMethod(item)}>  </Button>

                    <Popover content={<div style={{textAlign:'center'}}>
                        <Switch checked={item.pagepermisson} onChange={()=>switchMethod(item)}> </Switch>
                    </div>} title="配置" trigger={item.pagepermisson===undefined?'':'click'}>
                    <Button  shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson===undefined}>  </Button>
                    </Popover>
                </div>

            }          
          },
      ];
      
      const switchMethod=(item)=>{
       console.log(item)
       item.pagepermisson=item.pagepermisson===1?0:1
       setdataSource([...dataSource])

       //同步后端
       if(item.grade===1){
         axios.patch(`http://localhost:3001/rights/${item.id}`,{
           pagepermisson:item.pagepermisson
         })
       }else{
        axios.patch(`http://localhost:3001/children/${item.id}`,{
          pagepermisson:item.pagepermisson

       })
      }
    }
      const confirmMethod=(item)=>{

        confirm({
            title: '你确定要删除吗',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
              console.log('OK');
              deleteMethod(item)
            },
            onCancel() {
              console.log('Cancel');
            },
          });
      }
     //删除
      const deleteMethod=(item)=>{
          console.log(item)
          //当前页面状态同步+后端同步
          if(item.grade===1){

            setdataSource(dataSource.filter(data=>data.id!==item.id))

            axios.delete("http://localhost:3001/rights/${item.id}")
          }else{
              console.log(item.rightId)
              let list=dataSource.filter(data=>data.id===item.rightId)
              console.log(list)
              list[0].children=list[0].children.filter(data=>data.id!==item.id)
              setdataSource([...dataSource])
          }
 
      }
   
    return(
        <div>
           <Table dataSource={dataSource} columns={columns} 
           pagination={{
               pageSize:5
           }} />;

        </div>
    )
    }