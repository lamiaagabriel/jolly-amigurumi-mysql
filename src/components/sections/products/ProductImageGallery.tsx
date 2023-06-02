"use client"

import Image from "next/image"
import { Tab } from "@headlessui/react"

import { cn } from "@/ui/utils"

const ProductImageGallery = ({ images }: { images: string[] }) => {
  return (
    <Tab.Group
      as="div"
      className="grid grid-cols-1 sm:grid-cols-[0.2fr,1fr] gap-4 "
    >
      {/* Image selector */}
      <div>
        <Tab.List className="grid grid-cols-4 sm:grid-cols-1 gap-4">
          {images?.map((image, i) => (
            <Tab
              key={i}
              className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
            >
              {({ selected }) => (
                <>
                  <span className="absolute inset-0 rounded-md overflow-hidden">
                    <Image
                      src={image}
                      alt={""}
                      width={10000}
                      height={10000}
                      className="w-full h-full object-center object-cover"
                    />
                  </span>
                  <span
                    className={cn(
                      selected ? "ring-primary" : "ring-transparent",
                      "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
        {images?.map((image, i) => (
          <Tab.Panel key={i}>
            <Image
              src={image}
              alt={""}
              width={10000}
              height={10000}
              className="w-full h-full object-center object-cover sm:rounded-lg"
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
export default ProductImageGallery
