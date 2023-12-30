'use client'

import { useStateContext } from "@/contexts/ContextProvider";
import { useEffect, useState } from "react";
import { LoadingComponent } from "./LoadingComponent";

export function LoadingScreen() {
  const { loading, setLoading } = useStateContext();

  return (
    <>
      {loading &&
        <LoadingComponent></LoadingComponent>
      }
    </>
  )
}