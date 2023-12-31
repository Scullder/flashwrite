'use client'

import { useStateContext } from "@/contexts/ContextProvider";
import Message from "./Message";
import { useEffect } from "react";

export function MessageController() {
    const { alertMessage, setAlertMessage } = useStateContext();

    useEffect(() => {
      const timer = setTimeout(() => setAlertMessage({}), 5000)
      return () => clearTimeout(timer);
    });

    const close = () => {
      setAlertMessage({})
    }

    return (
      <>
        {Object.keys(alertMessage).length !== 0 &&
          <Message title={alertMessage.title} text={alertMessage.text} handleClose={close} status={alertMessage.status}></Message>
        }
      </>
    )
}