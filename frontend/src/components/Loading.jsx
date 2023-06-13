import { Spinner } from '@chakra-ui/react'
import React from 'react'
import "./loading.css"

const Loading = () => {
    return (
        <div id='loading-overlay'>
            {/* <div class="col-3">
                <div class="snippet" data-title="dot-floating">
                    <div class="stage">
                        <div class="dot-floating"></div>
                    </div>
                </div>
            </div>

            <div class="col-3">
                <div class="snippet" data-title="dot-pulse">
                    <div class="stage">
                        <div class="dot-pulse"></div>
                    </div>
                </div>
            </div> */}

            <div class="col-3">
                <div class="snippet" data-title="dot-windmill">
                    <div class="stage">
                        <div class="dot-windmill"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Loading

