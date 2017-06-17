import React from 'react'
import { wrap } from 'lodash'
import { graphql, compose } from 'react-apollo'

export function queries (queries, configs = {}) {
  const hocs = []
  for (const name in queries) {
    hocs.push(graphql(queries[name], Object.assign({ name }, configs[name])))
  }
  return compose(...hocs)
}

export function mutations (mutations, configs = {}) {
  const hocs = []
  const defaultState = {}
  for (const name in mutations) {
    hocs.push(graphql(mutations[name], Object.assign({ name }, configs[name])))
    defaultState[name] = { loading: false }
  }
  return compose(...hocs, Component => {
    return class extends React.Component {
      constructor (props) {
        super(props)
        this.state = defaultState
      }
      render () {
        const props = {}
        for (const name in mutations) {
          props[name] = wrap(this.props[name], async (mutate, ...args) => {
            this.setState({ [name]: {loading: true} })
            try {
              const data = await mutate(...args)
              this.setState({ [name]: {loading: false, data} })
              return data
            } catch (error) {
              this.setState({ [name]: {loading: false, error} })
              throw error
            }
          })
        }
        return <Component {...this.props} {...props} mutations={this.state} />
      }
    }
  })
}

export default compose
