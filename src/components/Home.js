import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { simpleAction } from '/store/actions/simpleAction';

const Home = () => {
  const exampleStore = useSelector(state => state.simpleReducer)
  const dispatch = useDispatch();

  console.log(exampleStore);

  const handleClick = () => {
    dispatch(simpleAction())
  }

  return (
    <div>
      <h1 className="center">Home</h1>
      <h4 className="center">
        {
          exampleStore.isLoading
            ? 'Loading...'
            : `Simple value: ${exampleStore.simpleValue}`
        }
      </h4>
      <div className="center">
        <button
          onClick={handleClick}
          disabled={exampleStore.isLoading}
        >
          Simulate request using redux
      </button>
      </div>
    </div>
  )
}

export default Home
