import { NativeBaseProvider } from 'native-base';
import Router from './src/routes';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      cacheTime: 1000 * 60 * 60 * 15,
    },
  },
});

export default function App() {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
