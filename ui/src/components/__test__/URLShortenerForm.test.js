import React from 'react';
import URLShortenerForm from '../URLShortenerForm';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent} from '@testing-library/react'


describe('post a link', () => {

    const server = setupServer(
        rest.post('http://localhost:4000/api/url', (req, res, ctx) => {
          return (ctx.json({"destination":"https://frontendmasters.com/courses/d3/introduction/","_id":"61fd027272f63e8a874022df","shortId":"qjaobk","__v":0}))
        })   
      )
      
      beforeAll(() => server.listen())
      afterEach(() => server.resetHandlers())
      afterAll(() => server.close())


    it('it changes inputs', () => {
        const {getByPlaceholderText} = render(<URLShortenerForm />);
        fireEvent.change(getByPlaceholderText('https://example.com'), { target: { value: 'https'}});
        expect(getByPlaceholderText('https://example.com').value).toBe('https');
    
       })
    
  })