import React, { forwardRef,useEffect,useState} from "react"
import { Form, Input, Select } from 'antd';

const UserForm=forwardRef((props,ref)=>{
    const { Option } = Select;
    const [isdisabled,setisdisabled] = useState(false);
    useEffect(()=>{
        // console.log(props.isUpdateDisabled)
        setisdisabled(props.isUpdateDisabled)
    },[props.isUpdateDisabled])
    return(
        <Form
                layout="vertical"
                ref={ref}          
              >
                <Form.Item
                  name="username"
                  label="用户名"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="密码"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="region"
                  label="区域"
                //   禁用的时候传入一个空数组
                  rules={isdisabled?[]:[{ required: true, message: '请选择区域' }]}
                >
                   <Select disabled={isdisabled}>
                     {
                      props.regionList.map(item=>
                        <Option value={item.value} key={item.id}>{item.title}</Option>)
                     }
                   
                    </Select>
                </Form.Item>
                <Form.Item
                  name="roleId"
                  label="角色"
                  rules={[{ required: true, message: '请选择角色' }]}
                >
                  <Select onChange={(value)=>{
                      console.log(value)
                      console.log(typeof(value))
                    //当选中的角色为超级管理员时，将区域设置为不可勾选，将region字段的值设置为''
                    //此处改成==，当1为字符串或者是number类型时，该操作均可执行
                      if(value ==1){
                        setisdisabled(true)
                        ref.current.setFieldsValue({
                            region:''
                        })
                      }else{
                        setisdisabled(false)
                      }
                  }
                  }>
                     {
                       props.roleList.map(item=>
                        <Option value={item.value} key={item.id}>{item.roleName}</Option>)
                     }
                   
                    </Select>
                </Form.Item>
                
              </Form>
    )
})
export default UserForm