import { useState } from 'react';
import { ProposalScreen } from './components/ProposalScreen';
import { SuccessScreen } from './components/SuccessScreen';

function App() {
  const [view, setView] = useState<'proposal' | 'success'>('proposal');

  return (
    <>
      {view === 'proposal' ? (
        <ProposalScreen onAccept={() => setView('success')} />
      ) : (
        <SuccessScreen onRestart={() => setView('proposal')} />
      )}
    </>
  );
}

export default App;
