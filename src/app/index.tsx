import LoadingScreen from '@/components/ui/loading';
import { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);

  
  return <LoadingScreen onFinish={() => setLoading(false)} />;
  
}