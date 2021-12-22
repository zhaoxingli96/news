import React, { useEffect, useState } from "react"
import {Table,Button,Popconfirm,Modal,TreeSelect } from "antd"
import axios from 'axios' 
import { DeleteOutlined,EditOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
export default function RoleList(){ 
    const [dataSource,setdataSource]=useState([])
    const [rightSource,setrightSource]=useState([])
    const [currentRights,setcurrentRights]=useState([])
    const [currentId,setcurrentId]=useState(0)

    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(()=>{
        axios.get("http://localhost:3001/roles").then(res=>{
            setdataSource(res.data)
        })
        
    },[])
    useEffect(()=>{
        axios.get("http://localhost:3001/rights?_embed=children").then(res=>{
            setrightSource(res.data)
        })
        
    },[])



    // const [visible, setVisible] = React.useState(false);
    // const [confirmLoading, setConfirmLoading] = React.useState(false);
    const columns=[ {
        title: 'ID',
        dataIndex: 'id',
        render:(id)=>{
            return <b>{id}</b>
        }
      },
      {
        title: '权限',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
          title:'操作',
          render:(item)=>{
              return <div>
                  {/* 删除 */}
                 <Popconfirm
                   title="确定删除吗？"
                   
                   onConfirm={()=>handleOk(item)}
                  
                   onCancel={()=>handleCancel(item)}
                    >
                   <Button  onClick={()=>showPopconfirm(item)} shape="circle" icon={<DeleteOutlined />}> 
        
                   </Button>
                 </Popconfirm>
                  {/* 编辑 */}
                  <Button  shape="circle" onClick={()=>showModal(item)} icon={<EditOutlined /> }></Button> 
                  <Modal title="权限列表" visible={isModalVisible} onOk={handleOkEdit} onCancel={handleCancelEdit}>

                  <TreeSelect 
                  treeData={rightSource}
                  value={currentRights}
                  treeCheckable={true}
                  placeholder={'请选择相应的权限'}
                  style={{width:'100%'}} 
                  onChange= {(value)=>onChange(value)}              
                  ></TreeSelect>
                    
                  </Modal>
              </div>
          }
      }
    ];
    
    //以下是删除操作
     const showPopconfirm = (item) => {
        // console.log(item)
      
     };
    const deleteMethod=(item)=>{
        setdataSource(dataSource.filter(data=>data.id!==item.id))
        //同步删除后端数据
        // axios.delete(" http://localhost:3001/roles/${item.id}")
        
    }
    const handleOk = (item) => {
        console.log('ok')
        deleteMethod(item)
        // console.log(item)
   
    };

    const handleCancel = () => {
        console.log("cancel")
    
  };
 //以下是编辑操作


 const showModal = (item) => {
   setIsModalVisible(true);
   setcurrentRights(item.rights)
   setcurrentId(item.id)
   
 };

 const handleOkEdit = () => {
   setIsModalVisible(false);
   //同步datasource
   setdataSource(dataSource.map(item=>{
       if(item.id===currentId){
           return{...item,rights:currentRights}
       }
       return item
   }))
   //patch
   axios.patch(`http://localhost:3001/roles/${currentId}`,{
       rights:currentRights
   })
 };

 const handleCancelEdit = () => {
   setIsModalVisible(false);
 };
 const onChange = value => {
    console.log('onChange ', value);
    setcurrentRights(value)
  };

    

    
    return(
        <div>
            <Table dataSource={dataSource} columns={columns} 
            ></Table>
        </div>
    )
    }