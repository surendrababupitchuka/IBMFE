import * as types from '../constants';
import { getLocationService, getVmListService,saveVMRecord, updateVMRecord,deleteVM } from '../services/VMService';
export function getReducerLocations(data){
    return {
        type: types.GETLOCATIONS, data
    }
}

export function getVMLISTData(data){
    return {
        type: types.GETVMLIST, data
    }
}

export const getLocations =  () => async dispatch => {
    try{
        let res = await getLocationService();
        if(res.failure){
            console.error(res.msg);
        }else{
            dispatch(getReducerLocations(res));
        }
    }catch(err){
        console.error(err)
    }
};

export const getVmList = () =>async dispatch =>{
    try{
        let res = await getVmListService();
        if(res.failure){
            console.error(res.msg);
        }else{
            
            dispatch(getVMLISTData(res));
        }
    }catch(err){
        console.error(err)
    }
}

export const addVMRecord = (data) => async dispatch =>{
    try{
        let res = await saveVMRecord(data);
        if(res.failure){
            console.error(res.msg);
        }else{
            dispatch(getVmList());
        }
    }catch(err){
        console.error(err)
    }
}

export const editVMRecordData = (data) => async dispatch =>{
    try{
        let res = await updateVMRecord(data);
        if(res.failure){
            console.error(res.msg);
        }else{
            dispatch(getVmList());
        }
    }catch(err){
        console.error(err)
    }
}

export const deleteVMRecord = (data) => async dispatch =>{
    try{
        let res = await deleteVM(data);
        if(res.failure){
            console.error(res.msg);
        }else{
            dispatch(getVmList());
        }
    }catch(err){
        console.error(err)
    }
}