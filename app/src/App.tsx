import React from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import WalletContext from './WalletContext'
import Home from './routes/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BecomeCreator from './routes/BecomeCreator'
import {
    BECOME_CREATOR,
    BROWSE_CREATORS,
    SINGLE_CREATOR,
} from './routes/routes'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import Creator from './routes/Creator'
import BrowseCreators from './routes/BrowseCreators'
import PageContainer from './container/PageContainer'

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        body2: {
            fontSize: 18,
        },
    },
})

function App() {
    return (
        <WalletContext>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PageContainer>
                                    <Home />
                                </PageContainer>
                            }
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
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
            <ToastContainer />
        </WalletContext>
    )
}

export default App
