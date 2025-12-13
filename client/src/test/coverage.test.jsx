import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthProvider } from '../hooks/AuthContext';

import Header from '../components/Header/Header';
import Home from '../pages/Home/Home';
import Chat from '../pages/Chat/Chat';
import Ranking from '../pages/Ranking/Ranking';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import Projects from '../pages/Project/Project';

describe('Coverage bootstrap tests', () => {
  it('renders main components', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
          <Home />
          <Chat />
          <Ranking />
          <Projects />
          <ProfilePage />
        </MemoryRouter>
      </AuthProvider>
    );
  });
});
