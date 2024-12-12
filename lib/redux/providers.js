'use client'

/* Instruments */
import { persistor, store } from '@/lib/redux'

import { PersistGate } from 'redux-persist/integration/react'
/* Core */
import { Provider } from 'react-redux'

export const ReduxProviders = props => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  )
}
