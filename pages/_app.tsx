import '@/styles/global.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../utils/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
