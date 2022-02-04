import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {MemoryRouter} from 'react-router-dom';
import HandleRedirect from '../HandleRedirect'



describe('Handle redirection', () => {

    const server = setupServer(
    
        rest.get('http://localhost:4000/api/url/2', (req, res, ctx) => {
          return res(ctx.status(202, 'Mocked status'))
        }),
      )
      
      beforeAll(() => server.listen())
      afterEach(() => server.resetHandlers())
      afterAll(() => server.close())

      test('handles server error', async () => {
        server.use(
          rest.get('http://localhost:4000/api/url/2', (req, res, ctx) => {
            return res(ctx.status(500))
          }),
        )
      
        render(
            <>
            <MemoryRouter>
                <HandleRedirect />
            </MemoryRouter>
            </>)
        expect(screen.getAllByRole('list')).toHaveLength(6)
      })
      
  })