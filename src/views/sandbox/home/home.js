import React from "react"
import { Button } from 'antd';
import axios from 'axios'
export default function Home(){ 
    const ajax=()=>{
        //取数据 get
        // axios.get("http://localhost:3001/posts").then(res=>{
        //     console.log(res.data)
        // })

        //增 post
        // axios.post("http://localhost:3001/posts",{
        //     title:"333333",
        //     author:"xiaoming"
        // })

        //修改 put put方法是直接替换，全部更新

        // axios.put("http://localhost:3001/posts/1",{
        //     title:"111-修改"
        // })

        //更新 patch

        // axios.patch("http://localhost:3001/posts/1",{
        //     title:"111-修改-111"
        // })
       
        //删除 delete
        // axios.delete("http://localhost:3001/posts/1",{
        // })

        //_embed
        // axios.get("http://localhost:3001/posts?_embed=comments").then(
        //     res=>{console.log(res.data)}
        // )

        //_expand 
        // axios.get("http://localhost:3001/comments?_expand=post").then(
        //     res=>{console.log(res.data)}
        // )

    }
       

    return(
        <div>
            Home
            <Button type="primary" >Primary Button</Button>
        </div>
    )
    }