import React from 'react'
import ReactDOM from 'react-dom'
import AppHeader from './AppHeader'

it('renders header successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppHeader />, div);
  expect(div).not.toEqual(null)
})