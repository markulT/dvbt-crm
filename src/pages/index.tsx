import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useEffect, useState} from "react";
import {MapContainer} from "react-leaflet";
import UtilMap from "@/components/utilMap";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {useAppSelector} from "@/store/hooks/redux";

const inter = Inter({ subsets: ['latin'] })

interface IMarker {
  lat:number,
  long:number
}

// const MapWithNoSSR = dynamic(()=>import('@/components/utilMap'), {ssr:false})

export default function Home() {
  const router = useRouter()
  const email = useAppSelector((state) => state.auth.email)

  useEffect(() => {
    if(!email) {
      router.push("/auth/login")
    }
  }, [])



  return (
    <main className="flex min-h-screen bg-white-bg w-full flex-col items-center justify-between p-24">
        <h1 className={"text-blue-5 font-semibold text-3xl"}>Вітаємо</h1>
    </main>
  )
}
