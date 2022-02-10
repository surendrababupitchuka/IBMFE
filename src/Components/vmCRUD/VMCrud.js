import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, getVmList, addVMRecord, editVMRecordData, deleteVMRecord } from '../../actions/vmCrud';

const VMCrud = () => {
    const dispatch = useDispatch();
    const {locations,vmDataList} = useSelector((state=>{
        return {
            locations:state.VMReducers.locations,
            vmDataList:state.VMReducers.vmDataList
        }
    }));
    const [isEdit,setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        vmID : "",
        vmName : '',
        vmLocation : '',
        vmStatus : "ON",
    });

    useEffect(()=>{
        dispatch(getLocations());
        dispatch(getVmList())
    },[]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name === "vmStatus"){
            setFormData(prevState => ({
                ...prevState,
                [name] : event.target.checked?"ON":"OFF"
            }));
        }else{
            setFormData(prevState => ({
                ...prevState,
                [name] : value
            }));
        }
        
    }

    const editVMRecord = (e,data)=>{
        setFormData(data);
        setIsEdit(true);
    }

    const deleteVMRecords = (e,data) =>{
        dispatch(deleteVMRecord(data));
    }

    const submitVmForm = (event) => {
        event.preventDefault();
        //Make POST API call here to submit data from FE
        try {
            if(isEdit){
                dispatch(editVMRecordData(formData));
            }else{
                dispatch(addVMRecord(formData));
            }
            
            setFormData({
                vmID : "",
                vmName : '',
                vmLocation : '',
                vmStatus : 'ON',
            });
            setIsEdit(false);
        } catch (error) {
            console.error('Something went wron!!', error);
            
        }

    }
    return (
        <div className='vmFormWrap'>
        <label for="Formid">
            VM ID
         
         
            <input name="vmID" value={formData.vmID} type="text" onChange={handleChange}></input></label>
            <label for="Formid"> VM name : <input name="vmName" value={formData.vmName} type="text" onChange={handleChange}></input>
            </label>
            <label for="Formid"> VM Location : <select id="location"   name='vmLocation' placeholder="Select Location" onChange={handleChange} value={formData.vmLocation}>
            <option value={""}>Select</option>
            {locations && locations.data && locations.data.map((item)=>{
                return <option key={item.key} value={item.name}>{item.name}</option>
            })}
        </select></label>
        <label>
            Status: 
        <input name="vmStatus" type="checkbox" checked={formData.vmStatus==="ON"} onChange={handleChange} />
        </label>
        {/* <input name="vmStatus" type="checkbox"  value={formData.vmStatus} onChange={handleChange}> OFF </input> */}
    <button type='submit' onClick={submitVmForm}>{isEdit?"Update":"Submit"}</button><button type="submit" onClick={()=>{
        setIsEdit(false);
        setFormData({
            vmID : "",
            vmName : '',
            vmLocation : '',
            vmStatus : 'ON',
        })
        }}>Reset</button>
    <table>
        <tr>
            <th>vmID</th>
            <th>VMName</th>
            <th>VM Location</th>
            <th>VM status</th>
            <th>Actions</th>
        </tr>
        {vmDataList && vmDataList.data && vmDataList.data.map(item=>{
            return <tr key={item.key}>
                <td>{item.vmID}</td>
                <td>{item.vmName}</td>
                <td>{item.vmLocation}</td>
                <td>{item.vmStatus}</td>
                <td><span onClick={(e)=>editVMRecord(e,item)}>Edit</span><span onClick={(e)=>deleteVMRecords(e,item)}>Delete</span></td>
            </tr>
        })}
    </table>
    </div>
    )
}

export default VMCrud
