import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ToneGenerator } from './components/ToneGenerator'

class App extends React.Component {
    render() {
        return ( 
            <div>
                <ToneGenerator />
            </div>
        )
    }
}

ReactDOM.render (
    <App />,
    document.getElementById('app')
)