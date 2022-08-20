import type { NextPage } from "next"
import React, { useRef, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

const HomePage: NextPage = () => {
  const router = useRouter()

  const urlRef = useRef<HTMLInputElement>(null)
  const customurlRef = useRef<HTMLInputElement>(null)
  const [checked, setChecked] = useState(false)
  const [urlgenerated, setUrlgenerated] = useState("")
  const [errormessage, setErrormessage] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUrlgenerated("")
    setErrormessage("")
    const data = {
      original: urlRef.current?.value || null,
      custom: customurlRef.current?.value || null,
    }
    fetch("/api/generateurl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setErrormessage(data.message)
        }
        setUrlgenerated(data.custom || data.generated)
        setChecked(false)
      })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-700">
      <form onSubmit={handleSubmit}>
        <div className="rounded-lg border shadow-md bg-gray-800 border-gray-700 flex flex-col items-center justify-center px-20 py-12">
          <label
            htmlFor="input-group-1"
            className="block mb-3 text-lg font-bold text-gray-300"
          >
            Enlace a cortar
          </label>
          <div className="relative mb-6">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M172.5 131.1C228.1 75.51 320.5 75.51 376.1 131.1C426.1 181.1 433.5 260.8 392.4 318.3L391.3 319.9C381 334.2 361 337.6 346.7 327.3C332.3 317 328.9 297 339.2 282.7L340.3 281.1C363.2 249 359.6 205.1 331.7 177.2C300.3 145.8 249.2 145.8 217.7 177.2L105.5 289.5C73.99 320.1 73.99 372 105.5 403.5C133.3 431.4 177.3 435 209.3 412.1L210.9 410.1C225.3 400.7 245.3 404 255.5 418.4C265.8 432.8 262.5 452.8 248.1 463.1L246.5 464.2C188.1 505.3 110.2 498.7 60.21 448.8C3.741 392.3 3.741 300.7 60.21 244.3L172.5 131.1zM467.5 380C411 436.5 319.5 436.5 263 380C213 330 206.5 251.2 247.6 193.7L248.7 192.1C258.1 177.8 278.1 174.4 293.3 184.7C307.7 194.1 311.1 214.1 300.8 229.3L299.7 230.9C276.8 262.1 280.4 306.9 308.3 334.8C339.7 366.2 390.8 366.2 422.3 334.8L534.5 222.5C566 191 566 139.1 534.5 108.5C506.7 80.63 462.7 76.99 430.7 99.9L429.1 101C414.7 111.3 394.7 107.1 384.5 93.58C374.2 79.2 377.5 59.21 391.9 48.94L393.5 47.82C451 6.731 529.8 13.25 579.8 63.24C636.3 119.7 636.3 211.3 579.8 267.7L467.5 380z" />
              </svg>
            </div>
            <input
              ref={urlRef}
              type="text"
              autoComplete="off"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
              placeholder="https://twitter.com/Toudv"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Personalizar el enlace acortado (opcional)
            </label>
          </div>
          {checked && (
            <div className="mb-4">
              <input
                ref={customurlRef}
                type="text"
                autoComplete="off"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                placeholder="mytwitter"
              />
            </div>
          )}
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Generar enlace
          </button>
          {urlgenerated && (
            <h1 className="text-white mt-4">
              Enlace generado <br />
              <Link href={urlgenerated} passHref>
                <a className="text-white text-lg font-bold">{`${window.location.origin}/${urlgenerated}`}</a>
              </Link>
            </h1>
          )}
          {errormessage && (
            <h1 className="text-red-500 text-lg font-bold">{errormessage}</h1>
          )}
        </div>
      </form>
    </div>
  )
}

export default HomePage
