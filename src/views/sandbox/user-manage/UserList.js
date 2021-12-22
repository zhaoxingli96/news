import React from "react"
import { useState, useEffect,useRef} from "react"
import axios from "_axios@0.24.0@axios"
import { Table, Switch, Button,Modal,Form, Input, Radio ,Select } from 'antd';
import { DeleteOutlined,EditOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import UserForm from "../../../components/user-manage/UserFrom";
import RoleList from "../right-manage/RoleList";
const {confirm}=Modal

export default function UserList(){ 
    const[dataSource,setdataSource]=useState()
    const [visible, setVisible] = useState(false);
    const [updateVisible, setupdateVisible] = useState(false);
    const[regionList,setregionList]=useState([])
    const[roleList,setroleList]=useState([])
    const[isUpdateDisabled,setisUpdateDisabled]=useState(false)
    const [form] = Form.useForm();
    const { Option } = Select;
    const addForm=useRef(null)
    const updateForm=useRef(null)

    useEffect(()=>{
        axios.get("http://localhost:3001/users?_expand=role").then(res=>{
            const list=res.data
            setdataSource(list)
            
        })
    },[])

    useEffect(()=>{
      axios.get("http://localhost:3001/regions").then(res=>{
          const list=res.data
          setregionList(list)
         
      })
  },[])

  useEffect(()=>{
    axios.get("http://localhost:3001/roles").then(res=>{
        const list=res.data
        setroleList(list)
    })
},[])

      const columns = [
        {
          title: '区域',
          dataIndex: 'region',
          render:(region)=>{return <b>{region===""?"全球":region}</b>}
        },
        {
          title: '角色名称',
          dataIndex: 'role',
          render:(role)=>{
              return role.roleName
          }
        
          }
        ,
        {
            title: '用户名称',
            dataIndex: 'username',
            }
          ,
          {
            title: '用户状态',
            dataIndex: 'roleState',
            render:(roleState,item)=>{return <Switch checked={roleState} disabled={item.default} onChange={()=>handlechange(item)}></Switch>}
            }
          ,
        {
            title: '操作',
            render:(item)=>{
                return <div>
                    <Button danger  shape="circle" disabled={item.default} icon={<DeleteOutlined />}  onClick={()=>confirmMethod(item)}>  </Button>

                    <Button  shape="circle" disabled={item.default} icon={<EditOutlined />} disabled={item.default} onClick={()=>handleUpdate(item)}>  </Button>
                </div>

            }
            
          },
      ];
      //弹出更新用户的模态框
      const handleUpdate=(item)=>{
        // console.log("00000")
        // console.log(item.roleId)
        // console.log(typeof(item.roleId))
        setTimeout(() => {
          setupdateVisible(true)
          if(item.roleId===1){
            //禁用
            setisUpdateDisabled(true)
          }else{
            //取消禁用
            setisUpdateDisabled(false)
          }
          // updateForm.current.setFieldsValue(item)
          updateForm.current.setFieldsValue({
            username:item.username,
            password:item.password,
            region:item.region,
            roleId:item.role.roleName
          }
          )      
        }, 0);
      }
      
     //弹出删除的模态框
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
            setdataSource(dataSource.filter(data=>data.id!==item.id))
            axios.delete(`http://localhost:3001/users/${item.id}`)
      };
      // 以下是添加用户功能
      const addFormOk=()=>{
        addForm.current.validateFields().then(value=>{
                  setVisible(false)
                  //post到后端，生成id，再设置datasource,方面后面的删除和更新
                  axios.post("http://localhost:3001/users",{
                    ...value,
                    "roleState":true,
                    'default':false
                  }).then(res=>{
                    console.log(res.data)
                    //生成id之后在进行更新dataSource
                    setdataSource([...dataSource,{
                      ...res.data,
                      role:roleList.filter(item=>item.id===Number(value.roleId))[0]
                    }])
                  })
                }).catch(err=>{
                  console.log(err)
                })
      }

      // 以下是更新用户功能

      const updateFormOk=()=>{

      }
      const handlechange=(item)=>{
         item.roleState=!item.roleState
         setdataSource([...dataSource])
         axios.patch(`http://localhost:3001/users/${item.id}`,{
           roleState:item.roleState
         }

         )
      }

    return(
        <div>
          <Button type="primary" onClick={() => {setVisible(true);
        }}> 添加用户</Button>
          <Table dataSource={dataSource} columns={columns} 
           pagination={{
               pageSize:5
           }}
           rowKey={item=>item.id}/>;
         {/* 以下是添加用户 */}
          <Modal
              visible={visible}
              title="添加用户"
              okText="确定"
              cancelText="取消"
              onCancel={()=>{setVisible(false)}}
              onOk={() => addFormOk()
              }
            >
              <UserForm regionList={regionList} roleList={roleList} ref={addForm}></UserForm>
          </Modal>
        {/* 以下是编辑中的更新用户 */}
        <Modal
              visible={updateVisible}
              title="更新"
              okText="确定更新"
              cancelText="取消"
              onCancel={()=>{
                setupdateVisible(false)
                setisUpdateDisabled(!isUpdateDisabled)
  
              }}
              onOk={() => updateFormOk()
              }
            >
              <UserForm regionList={regionList} roleList={roleList} ref={updateForm} isUpdateDisabled={isUpdateDisabled}></UserForm>
          </Modal>
        </div>
    )
    }           
