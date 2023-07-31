import React, { useContext } from 'react';
import { Link } from 'react-router-dom';



export default function Title() {
    return (
        <div className="title">
            <div className='row'>
                <div className="title-name col-12">
                    <Link to='/'>
                        <i class="bi bi-house-heart" >     </i>
                        smart home
                    </Link>
                </div>
            </div >
        </div >
    )
}
