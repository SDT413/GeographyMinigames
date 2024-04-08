import React, {FC, PropsWithChildren} from 'react';
import {persistor, store} from "@/store/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {ChakraProvider} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from  "@tanstack/react-query";

const ReduxAndChakraProviders:FC<PropsWithChildren<any>>
    = ({children}) => {
    const queryClient = new QueryClient();
    return (
            <div>
                <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <ChakraProvider>
                        {children}
                    </ChakraProvider>
                </PersistGate>
            </Provider>
                </QueryClientProvider>

        </div>
    );
};

export default ReduxAndChakraProviders;