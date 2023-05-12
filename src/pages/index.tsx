import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useEffect, useState} from "react";
import {MapContainer} from "react-leaflet";
import UtilMap from "@/components/utilMap";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ['latin'] })

interface IMarker {
  lat:number,
  long:number
}

// const MapWithNoSSR = dynamic(()=>import('@/components/utilMap'), {ssr:false})

export default function Home() {



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  )
}
