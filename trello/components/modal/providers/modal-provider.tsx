"use client";

import {CardModal} from "@/components/modal/card-modal";
import {useState, useEffect} from "react";
import {ProModal} from "@/components/modal/card-modal/pro-modal";


export const ModalProvider = () => {

    const [isMounted, setIsMounted] =  useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null;
    }



    return (
        <>
            <CardModal/>
            <ProModal />
        </>
    )
}