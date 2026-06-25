import { useState, useEffect } from 'react';
import { ProposalScreen } from './components/ProposalScreen';
import { SuccessScreen } from './components/SuccessScreen';

export type Teacher = 'tymeson' | 'kinsella' | 'bain';

const getRoute = (): Teacher => {
  const path = window.location.pathname.toLowerCase();
  if (path === '/kinsella') return 'kinsella';
  if (path === '/bain') return 'bain';
  return 'tymeson'; // Default path fallback
};

function App() {
  const [teacher, setTeacher] = useState<Teacher>(getRoute());
  const [view, setView] = useState<'proposal' | 'success'>('proposal');

  useEffect(() => {
    const handlePopState = () => {
      setTeacher(getRoute());
      setView('proposal'); // Reset back to proposal when navigation changes
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      {view === 'proposal' ? (
        <ProposalScreen teacher={teacher} onAccept={() => setView('success')} />
      ) : (
        <SuccessScreen teacher={teacher} onRestart={() => setView('proposal')} />
      )}
    </>
  );
}

export default App;
