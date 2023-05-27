import { Spinner } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
    return (
        <div id='overlay'>
            <div id='loading'>
                <Spinner
                    thickness='4px'
                    speed='1s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </div>
        </div>
    )
}

export default Loading
