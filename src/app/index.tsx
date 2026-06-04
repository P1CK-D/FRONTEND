import LoadingScreen from '@/components/ui/loading';
import MainScreen from '@/components/ui/main';
import { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);

  return loading ? (
    <LoadingScreen onFinish={() => setLoading(false)} />
  ) : (
    <MainScreen />
  );
}