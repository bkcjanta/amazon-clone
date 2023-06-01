import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dispatcher = (fun) => {
    const dispatch = useDispatch()

    return React.useCallback(
        (...args) => dispatch(fun(...args)),
        [dispatch, fun],
    )

}

export default Dispatcher

export const Navigate = ({ url }) => {
    const navigate = useNavigate();
    return navigate(url);
}
