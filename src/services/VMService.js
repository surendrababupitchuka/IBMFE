import { BASE_URL, GETLOCATIONS,GETVMLIST, ADDVMRECORD, UPDATEVMRECORD, DELETEVMRECORDDATA } from "../utils/Api"


export const getLocationService = async () =>{

    return await fetch(BASE_URL+GETLOCATIONS,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json());
}

export const getVmListService = async () =>{
    return await fetch(BASE_URL+GETVMLIST,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json());
}

export const saveVMRecord = async (data) =>{
    return await fetch(BASE_URL+ADDVMRECORD,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res=>res.json());
}

export const updateVMRecord = async (data) =>{
    return await fetch(BASE_URL+UPDATEVMRECORD,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res=>res.json());
}

export const deleteVM =async(data) =>{
    return await fetch(BASE_URL+DELETEVMRECORDDATA+`/${data.key}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json());
}