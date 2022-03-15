import React, { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import WalletContext from './WalletContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BecomeCreator from './routes/BecomeCreator';
import {
    BECOME_CREATOR,
    BROWSE_CREATORS,
    SINGLE_CREATOR,
} from './routes/routes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Creator from './routes/Creator';
import BrowseCreators from './routes/BrowseCreators';
import PageContainer from './container/PageContainer';
import RefreshContext from './context';
import AddPost from './routes/AddPost';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        body2: {
            fontSize: 18,
        },
    },
});

function App() {
    const [refreshVal, setRefreshValue] = useState(0);
    return (
        <WalletContext>
            <ThemeProvider theme={theme}>
                <RefreshContext.Provider
                    value={{
                        lastValue: refreshVal,
                        refresh: () => setRefreshValue(Math.random()),
                    }}
                >
                    <CssBaseline />
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to={BROWSE_CREATORS} />}
                            />
                            <Route
                                path={BECOME_CREATOR}
                                element={
                                    <PageContainer>
                                        <BecomeCreator />
                                    </PageContainer>
                                }
                            />
                            <Route
                                path={BROWSE_CREATORS}
                                element={
                                    <PageContainer>
                                        <BrowseCreators />
                                    </PageContainer>
                                }
                            />
                            <Route
                                path={SINGLE_CREATOR.concat(':creatorId')}
                                element={
                                    <PageContainer>
                                        <Creator />
                                    </PageContainer>
                                }
                            />
                            <Route
                                path={SINGLE_CREATOR.concat(
                                    ':creatorId'
                                ).concat('/add-post')}
                                element={
                                    <PageContainer>
                                        <AddPost />
                                    </PageContainer>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </RefreshContext.Provider>
            </ThemeProvider>
            <ToastContainer />
        </WalletContext>
    );
}

export default App;
