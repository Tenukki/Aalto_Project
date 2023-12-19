"use client"
import ModifyEvent from "../components/modifyEvents/modifyEvent"
import { SnackbarProvider } from 'notistack';
import { useConnect } from 'remx';
import { store } from '../remx/events';

export default function Test() {

    const { editEvent } = useConnect(() => ({
        editEvent: store.getEditedEvent()
      }));


    return (
        <SnackbarProvider maxSnack={1}>
        <div className="flex-col items-center justify-center h-screen bg-gray-100 p-5">
            <ModifyEvent event={editEvent}/> 
        </div>
        </SnackbarProvider>
    );
}