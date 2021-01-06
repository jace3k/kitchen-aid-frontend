import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import { simpleValuefetchRequest } from 'store/simple/actions'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const simpleState = useSelector((state: ApplicationState) => state.simple)
  const dispatch = useDispatch();

  console.log(simpleState);

  const handleClick = () => {
    dispatch(simpleValuefetchRequest())
  }

  return (
    <div>
      <h1 className="center">Home</h1>
      <h4 className="center">
        {
          simpleState.loading
            ? 'Loading...'
            : `Simple value: ${simpleState.simpleValue}`
        }
      </h4>
      <div className="center">
        <button
          onClick={handleClick}
          disabled={simpleState.loading}
        >
          Simulate request using redux
      </button>
      </div>
    </div>
  )
}

export default Home
