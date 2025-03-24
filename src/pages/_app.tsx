import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@/styles/theme';
import createEmotionCache from '@/utils/createEmotionCache';
import '@/styles/globals.css';
import { Web3Provider } from '@/contexts/Web3Context';
import { AppStateProvider } from '@/contexts/AppStateContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>VisionX - AI Visual Analysis Platform for Web3</title>
        <meta name="description" content="VisionX - Redefining user interaction with blockchain through AI-powered visual technology" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Web3Provider>
          <AppStateProvider>
            <Component {...pageProps} />
          </AppStateProvider>
        </Web3Provider>
      </ThemeProvider>
    </CacheProvider>
  );
} 