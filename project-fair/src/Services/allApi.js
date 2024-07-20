import { BASEURL } from "./baseUrl";
import { commonAPI } from "./commonApi";

// register
export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${BASEURL}/user/register`,user,"")
}

// loginapi
export const loginAPI = async (user)=>{
    try {
        return await commonAPI("POST",`${BASEURL}/user/login`,user,"")
    } catch (error) {
        console.log('error',error);
    }
}

// AddprojectAPI
export const addprojectAPI = async (project,header)=>{
    return await commonAPI("POST",`${BASEURL}/projects/add`,project,header)
}

// userProjects
export const userProjectAPI = async (header)=>{
    return await commonAPI("GET",`${BASEURL}/user/projects`,"",header)
}

// homeproject bflogin
export const homeprojects = async ()=>{
    try {
        return await commonAPI("GET",`${BASEURL}/home/projects`,"","")
    } catch (error) {
        console.log(error);
    }
}

// homeproject Aflogin all project
export const homeproject = async (searchkey,header)=>{
    return await commonAPI("GET",`${BASEURL}/projects/all?search=${searchkey}`,"",header)
}

// edit project
export const editprojectAPI = async (projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASEURL}/project/edit/${projectId}`,reqBody,reqHeader)
}

// delete project
export const deleteprojectAPI = async (projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASEURL}/project/remove/${projectId}`,{},reqHeader)
}

// update user
export const updateuserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASEURL}/user/update`,reqBody,reqHeader)
}