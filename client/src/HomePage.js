import React from 'react'
import request from 'request-promise'
class HomePage extends React.Component {

  async componentDidMount () {
    const data = await request('http://localhost:9000/api/login')
    console.log(data)
  }

  render () {
    return (
      <div>
        <h1>Hello it is so good development so far wow this is it</h1>
      </div>
    )
  }
}

export default HomePage
