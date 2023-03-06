import React, {useEffect } from 'react';
import { getInventoryStats } from '../../actions/adminActions';
import {useDispatch, useSelector } from 'react-redux';

const InventoryAnalytics = () => {

    const dispatch = useDispatch();
    const {totalDevices, instockDevices, outstockDevices, brokenDevices, cuffDevices, weightDevices, spo2Devices} = useSelector(state => state.inventoryStats);

    useEffect(() => {   
        dispatch(getInventoryStats())
    }, [dispatch]);


  return (
    <section>
        <div className="container">
        <div className="row">
            <div className="col-md-3">
                <div className="row-display card">
                    <span className="deviceStatsNumber" style={{backgroundColor: '#5F90D0'}}>{totalDevices && totalDevices} </span> <span className="mr-4 mt-2"> Total RPM Devices</span>                    
                </div>
            </div>

            <div className="col-md-3">
                <div className="row-display card">
                    <span className="deviceStatsNumber" style={{backgroundColor: '#00CD66'}}>{outstockDevices && outstockDevices < 10 ? '0'+outstockDevices : outstockDevices} </span> <span className="mr-4 mt-2"> Assigned Devices</span>                                    
                </div>
            </div>

            <div className="col-md-3">
                <div className="row-display card">
                    <span className="deviceStatsNumber" style={{backgroundColor: 'dodgerblue'}}>{instockDevices && instockDevices < 10 ? '0'+instockDevices : instockDevices} </span> <span className="mr-4 mt-2">Instock Devices</span>                                                       
                </div>
            </div>

            <div className="col-md-3">
                <div className="row-display card">
                    <span className="deviceStatsNumber" style={{backgroundColor: '#FF4040'}}>{brokenDevices && brokenDevices < 10 ? '0'+brokenDevices : brokenDevices} </span> <span className="mr-4 mt-2">Broken Devices</span>                                                       
                </div>
            </div>
            
            {/* Second Row */}
            <div className="col-md-3 mt-4">
                <div className="row-display card">
                    <span className="deviceStatsNumber" style={{backgroundColor: '#F6BA07'}}>{cuffDevices && cuffDevices < 10 ? '0'+cuffDevices : cuffDevices} </span> <span className="mr-4 mt-2">Cuff Devices</span>                                                       
                </div>
            </div>

            <div className="col-md-3 mt-4">
                <div className="row-display card">
                    <span className="deviceStatsNumber" style={{backgroundColor: '#CC3140'}}>{weightDevices && weightDevices < 10 ? '0'+weightDevices : weightDevices} </span> <span className="mr-4 mt-2">Weight Devices</span>                                                       
                </div>
            </div>

            <div className="col-md-3 mt-4">
                <div className="row-display card">
                    <span className="deviceStatsNumber" style={{backgroundColor: '#17A2B8'}}>{spo2Devices && spo2Devices < 10 ? '0'+spo2Devices : spo2Devices} </span> <span className="mr-4 mt-2">Spo2 Devices</span>                                                       
                </div>
            </div>
        </div>
        </div>
        <br />
    </section>
  )
}

export default InventoryAnalytics