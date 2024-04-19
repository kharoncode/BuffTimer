import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
   it('should have Hello World text', () => {
      render(<Home />);
      const myElem = screen.getByText('Hello World');
      expect(myElem).toBeInTheDocument();
   });

   it('should contain the text "World"', () => {
      render(<Home />);
      const myElem = screen.getByText(/world/i);
      expect(myElem).toBeInTheDocument();
   });

   it('should have a heading', () => {
      render(<Home />);
      const myElem = screen.getByRole('heading', {
         name: /hello/i,
      });
      expect(myElem).toBeInTheDocument();
   });
});
