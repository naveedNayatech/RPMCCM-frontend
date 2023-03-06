import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const RPMMinutesProgress = ({count, totalTime }) => {
  return (
    <>

    {/* Select box for selecting month  */}
    {/* <div className="row-display">
        <select name="month" className="form-control" placeholder="Select Month">
            <option value="01">Jan</option>
            <option value="02">Feb</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">Aug</option>
            <option value="09">Sept</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
        </select>
        &nbsp;
        <select name="month" className="form-control" placeholder="Select Year">
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
        </select>
        &nbsp;
        <button type="submit" name="submit" className="btn btn-primary"><i className='bx bx-search'></i></button>
    </div> */}
            <small className="row-display"> 
                <b className="text-white">9 9 4 5 4  </b>
                <span style={{color: 'white', letterSpacing: '2px'}}> {count} / 16 days </span></small>
                <ProgressBar min="0" max="16" variant='success' label={(count / 16) * 100 + "%"} now={count} />

                    <br />

                    {totalTime >=0 && totalTime <= 20 ? <>
                        <small className="row-display"> 
                            <b className="text-white">9 9 4 5 7 : </b> 
                            <span style={{color: 'white', letterSpacing: '2px'}}>{totalTime} / 20 mins</span>
                        </small>
                        
                        <ProgressBar min="0" max="20" variant='success' label={(totalTime / 20) * 100 + "%"} now={totalTime} />
                    </> : <>
                    <small className="row-display text-white">
                        <b>99457 : </b> 
                        <span style={{letterSpacing: '2px'}}>20 / 20 mins </span></small>
                        <ProgressBar min="0" max="20" variant='success' label="100%" now="20" />
                    </>}
                     

                    <br />
                    {totalTime >=21 ? <>
                        <small className="row-display">
                            <b className="text-white">9 9 4 5 8 : </b> 
                            <span style={{color: 'white', letterSpacing: '2px'}}>{totalTime > 40 ? "40" : totalTime} / 40 mins </span></small>    
                        <ProgressBar min="21" max="40" variant='success' label={totalTime > 40 ? "100%" : (totalTime / 40) * 100 + "%"} now={totalTime} />
                    </> : <>
                    <small className="row-display">
                        <b className="text-white">9 9 4 5 8 : </b> 
                        <span style={{color: 'white', letterSpacing: '2px'}}>0 / 40 mins </span></small>
                        <ProgressBar min="21" max="40" variant='dangar' now="21" />
                    </>}
                    
                    <p style={{marginTop: "14px", fontSize:"12px", color: '#FFF'}}>Total {totalTime || 0} Mins - Month of {new Date().toLocaleString('en-us',{month:'short', year:'numeric'})}</p>
    </>
  )
}

export default RPMMinutesProgress