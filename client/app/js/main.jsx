import React, { Component } from 'react'
import Relay from 'react-relay/classic'
import { render } from 'react-dom'
import _ from 'lodash'

class App extends Component {
  render() {
    let { persons } = this.props
    persons = _.map(persons.edges, 'node')

    return (
      <div>
        <p>Hello, World!</p>
        <ul>
          {_.map(persons, ({ firstName, id, lastName, tasks }) => (
            <li key={_.uniqueId()}>
              <div>{firstName} {lastName}</div>
              <ul>
                {_.map(tasks, ({ title, completed, id: taskId }) => (
                  <li key={taskId}>{title} {completed ? '(X)' : '( )'}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const Application = Relay.createContainer(App, {
  fragments: {
    persons: () => Relay.QL`
      fragment on PersonConnection {
        edges {
          node {
            __typename
            email
            firstName
            id
            lastName
            tasks {
              id
              title
              completed
            }
          }
        }
      }
    `,
  },
})

class ApplicationRoute extends Relay.Route {
  static routeName = 'ApplicationRoute'
  static queries = {
    persons: (Component) => Relay.QL`
      query {
        persons {
          ${Component.getFragment('persons')}
        }
      }
    `,
  }
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3030/graphql'),
)

const RootComponent = (
  <Relay.RootContainer
    Component={Application}
    route={new ApplicationRoute()}
  />
)

render(RootComponent, document.getElementById('root'))
