import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const CCMMinutesProgress = ({totalTimeinCCM}) => {
  return (
    <>
        {totalTimeinCCM >=0 && totalTimeinCCM <= 20 ? <>
            <small className="row-display text-white" style={{letterSpacing: '2px'}}>
                <span>99490: </span> {totalTimeinCCM} / 20 mins</small>
                <ProgressBar min="0" max="20" variant='success' label={((totalTimeinCCM / 20) * 100).toFixed() + "%"} now={totalTimeinCCM} />
        </> : <>
        <small className="row-display text-white" style={{letterSpacing: '2px'}}>
                <span>99490 : </span> 20 / 20 mins</small>
                <ProgressBar min="0" max="20" variant='success' label="100%" now="20" />
        </>}  

        <br />
        {totalTimeinCCM >=21 && totalTimeinCCM <=40 ? <>
            <small className="row-display text-white" style={{letterSpacing: '2px'}}>
                <span>99439 : </span> {totalTimeinCCM} / 40 mins</small>
                <ProgressBar min="21" max="40" variant='success' label={((totalTimeinCCM / 40) * 100).toFixed() + "%"} now={totalTimeinCCM} />
        </> : totalTimeinCCM >= 41 ? <>
            <small className="row-display text-white" style={{letterSpacing: '2px'}}>
                <span>99439 : </span> 40 / 40 mins</small>
            <ProgressBar min="21" max="40" variant='success' now="40" label="100%" />
        </> : <>
            <small className="row-display text-white" style={{letterSpacing: '2px'}}>
                <span>99439 : </span> 0 / 40 mins</small>
            <ProgressBar min="21" max="40" variant='success' now="0" />
        </>}
        

        <br />
        {totalTimeinCCM >=41 && totalTimeinCCM <=60 ? <>
            <small className="row-display text-white" style={{letterSpacing: '2px'}}>
                <span>99487  : </span> {totalTimeinCCM} / 60 mins</small>
            <ProgressBar min="41" max="60" variant='success' label={((totalTimeinCCM / 60) * 100).toFixed() + "%"} now={totalTimeinCCM} />
        </> : totalTimeinCCM >= 61 ? <>
            <small className="row-display text-white" style={{letterSpacing: '2px'}}>
                <span>99487 : </span> 60 / 60 mins</small>
            <ProgressBar variant='success' min="41" max="60" now="60" label="100%" />
        </> : <>
        <small className="row-display text-white" style={{letterSpacing: '2px'}}>
            <span>99487  : </span> 0 / 60 mins</small>
            <ProgressBar variant='success' now="0" />
        </>}

        <br />
        {totalTimeinCCM >= 60 && totalTimeinCCM <=90 ? <>
            <small className="row-display text-white" style={{letterSpacing: '2px'}}>
                <span>99489  : </span> {totalTimeinCCM} / 90 mins</small>
            <ProgressBar min="60" max="90" variant='success' label={((totalTimeinCCM / 90) * 100).toFixed() + "%"} now={totalTimeinCCM} />
        </> : totalTimeinCCM >= 91 ? <>
            <small className="row-display text-white" style={{letterSpacing: '2px'}}>
                <span>99439 : </span> 90 / 90 mins</small>
            <ProgressBar variant='success' label="100%" />
        </> : <>
        <small className="row-display text-white" style={{letterSpacing: '2px'}}>
            <span>99489  : </span> 0 / 90 mins</small>
            <ProgressBar variant='success' now="0" />
        </>}

        <p style={{marginTop: "14px", fontSize:"12px", color: '#FFF'}}>Total {totalTimeinCCM || 0} Mins - {new Date().toLocaleString('en-us',{month:'short', year:'numeric'})} in CCM.</p>


    </>
  )
}

export default CCMMinutesProgress