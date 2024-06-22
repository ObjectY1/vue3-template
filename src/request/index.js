import axios from 'axios'
import {ElMessage} from "element-plus";
axios.defaults.baseURL = "http://localhost:8888"

const defaultFailure = (message, code, url) => {
    console.warn(`请求地址：${url}，状态码：${code}，错误信息：${message}`)
    ElMessage.warning(message)
}

const defaultError = (err) => {
    console.error(err)
    ElMessage.error("发生错误")
}
function internalPost(url, data, header, success, failure, error = defaultError){
    axios.post(url, data, {
        headers: header
    }).then(({data}) => {
        if(data.code === 200){
            success(data.data)
        }else{
            failure(data.message,data.code,url)
        }
    }).catch((err) => {
        error(err)
    })
}

function internalGet(url, params, header, success, failure, error = defaultError){
    axios.get(url, {params: params,headers: header}).then(({data}) => {
        if(data.code === 200){
            success(data.data)
        }else{
            failure(data.message,data.code,url)
        }
    }).catch((err) => {
        error(err)
    })
}

export function userLogin(data, success, failure = defaultFailure){
    internalPost("/api/auth/login", data, {
        'Content-Type': 'application/json'
    }, success, failure)
}

export function userLogout(success, failure = defaultFailure) {
    internalGet("/api/auth/logout", null, {
        'Authorization': localStorage.getItem("token")
    }, success, failure)
}

export function sendRegisterEmail(email, success, failure = defaultFailure) {
    internalPost("/api/auth/sendRegisterMail", {email: email}, {
        'Content-Type': 'application/json'
    },success, failure)
}

export function userRegister(data, success, failure = defaultFailure) {
    internalPost("/api/auth/register", data, {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
    }, success, failure)
}