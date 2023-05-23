import React from "react"

import type { Metadata } from "next"
export const metadata: Metadata = { title: `Home | ${process.env.app_title}` }

import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/ui/button"

const toyImages: string[] = [
  "https://images.unsplash.com/photo-1671212684942-5c8a3dc3234e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1971&q=80",
  "https://images.unsplash.com/photo-1671212684958-2e59c6bafaea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1071&q=80",
  "https://images.unsplash.com/photo-1677892917289-07603a49f38d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  "https://images.unsplash.com/photo-1602773974733-b56200c8653f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80",
  "https://images.unsplash.com/photo-1677892917297-2de976c9ea11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  "https://images.unsplash.com/photo-1602773984044-3ecbed81556d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1183&q=80",
  "https://images.unsplash.com/photo-1674069698102-682409828872?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  "https://images.unsplash.com/photo-1656871259137-bcd3946055c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  "https://images.unsplash.com/photo-1656871260715-3134df2fcd7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
]

const Home = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hero section */}
      <div className="pt-16 pb-80 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="container relative sm:static">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              knitting toys with a hook in the amigurumi technique!
            </h1>
            <p className="max-w-prose md:max-w-prose mt-4 text-xl text-gray-500">
              Every author&apos;s hero is created with special warmth and love!
              With my workshops you can make a unique cute toy that will settle
              not only in your heart, but also in the hearts of your customers!
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-4">
                      <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                        <Image
                          width={1000}
                          height={1000}
                          priority
                          src={toyImages[0]}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <Image
                          width={1000}
                          height={1000}
                          priority
                          src={toyImages[1]}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-4">
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <Image
                          width={1000}
                          height={1000}
                          priority
                          src={toyImages[2]}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <Image
                          width={1000}
                          height={1000}
                          priority
                          src={toyImages[3]}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <Image
                          width={1000}
                          height={1000}
                          priority
                          src={toyImages[4]}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-4">
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <Image
                          width={1000}
                          height={1000}
                          priority
                          src={toyImages[5]}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <Image
                          width={1000}
                          height={1000}
                          priority
                          src={toyImages[6]}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href={{ pathname: "/products" }}
                className={buttonVariants({})}
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Home
