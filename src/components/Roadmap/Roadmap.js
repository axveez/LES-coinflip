import React from 'react'

function Roadmap({avatar, phase, title, content, marginTop}) {
    return (
        <div className='d-flex flex-column' style={{marginTop: marginTop}}>
            <div className='d-flex justify-content-center'><img src={avatar} alt='avatar' className='avatar' /></div>
            <div className='d-flex justify-content-center'><img src={phase} alt='phase' className='phase' /></div>
            <span className='d-flex justify-content-center title text-center'>{title}</span>
            <span className='d-flex justify-content-center description'>{content}</span>
        </div>
    )
}

export default Roadmap;