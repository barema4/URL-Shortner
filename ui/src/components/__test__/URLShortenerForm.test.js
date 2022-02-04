import React from 'react';
import URLShortenerForm from '../URLShortenerForm';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, findByText} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, useParams } from 'react-router-dom';
import {createMemoryHistory} from 'history'




// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams: () => ({
//     authorId: 1
//   }),

// }));

describe('edit author details', () => {

    const server = setupServer(
        rest.post('http://localhost:4000/api/url', (req, res, ctx) => {
          return (ctx.json('123'))
        })
        
      )
      
      beforeAll(() => server.listen())
      afterEach(() => server.resetHandlers())
      afterAll(() => server.close())

//     it('loads without failing', () => {
    
//      const {getByText} = render(<MemoryRouter initialEntries={[{ pathname: '/authors/1' }]}>
//      <Route path="/authors/:authorId">
//        <URLShortenerForm />
//      </Route>
//    </MemoryRouter>,);
//      expect(getByText('First Name')).toBeInTheDocument();
//      expect(getByText('Last Name')).toBeInTheDocument();
//     })

    it('it changes inputs', () => {
        const {getByPlaceholderText} = render(<URLShortenerForm />);
        fireEvent.change(getByPlaceholderText('https://example.com'), { target: { value: 'https'}});
        expect(getByPlaceholderText('https://example.com').value).toBe('https');
    
       })

       it('creates a new short url', () => {
        const {getByText,findByText, getByPlaceholderText, debug} = render(<URLShortenerForm />);
        const url = getByPlaceholderText('https://example.com')
        fireEvent.change(url, {target: {value: 'https://www.udemy.com/'}})
        debug()
        // const leftClick = {button: 0}
        // userEvent.click(getByText('CREATE'), leftClick)
        // debug()
        // expect(url.value).toEqual('https://www.udemy.com/')
        
    
       })
    
  })