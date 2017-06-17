import React from 'react'
import {render} from 'react-dom'

class Demo extends React.Component {
  render () {
    return <div />
  }
}

render(<Demo />, document.querySelector('#demo'))
