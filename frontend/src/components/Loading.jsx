import { Spinner } from '@chakra-ui/react'
import React from 'react'
import "./loading.css"

const Loading = () => {
    return (
        <div id='loading-overlay'>
            {/* <div className="col-3">
                <div className="snippet" data-title="dot-floating">
                    <div className="stage">
                        <div className="dot-floating"></div>
                    </div>
                </div>
            </div>

            <div className="col-3">
                <div className="snippet" data-title="dot-pulse">
                    <div className="stage">
                        <div className="dot-pulse"></div>
                    </div>
                </div>
            </div> */}

            <div className="col-3">
                <div className="snippet" data-title="dot-windmill">
                    <div className="stage">
                        <div className="dot-windmill"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Loading

