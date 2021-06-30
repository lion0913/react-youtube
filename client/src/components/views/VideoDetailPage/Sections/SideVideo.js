import React from 'react';

function SideVideo() {
    return(
        <div style={{display:'flex', marginBottom:"1rem", padding:"0 2rem"}}>
            <div style={{width:"40%", marginBottom:"1rem"}}>
                 <a href>
                     <img style={{width:"100%"}} src alt />
                 </a>
            </div>
            <div style={{width:'50%'}}>
                <a href>
                    <span style={{fontsize:"1rem", color:'black'}}>videoTitle</span><br />
                    <span>이름</span><br />
                    <span>조회수</span><br />
                    <span>상영시간</span>
                </a>

            </div>
        </div>

    )
}

export default SideVideo