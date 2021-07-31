import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import type { Option } from '../types'
import OptionItem from './components/OptionItem'
import Plus from './components/Plus'
import Xmark from './components/Xmark'

const App: FC = () => {
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    chrome.storage.local.get('options', (items) => {
      const options = items.options

      if (options) {
        setOptions(options)
      }
    })
  }, [])

  return (
    <div className="app">
      <h1 className="app-title">Multilinguist</h1>

      <div className="options">
        {options.map((option, idx) => (
          <OptionItem
            key={option.url + option.locale + idx}
            option={option}
            update={(newOption) => {
              setOptions((prevOptions) => {
                const newOptions = [...prevOptions]
                newOptions[idx] = newOption
                chrome.storage.local.set({ options: newOptions })

                return newOptions
              })
            }}
            remove={() => {
              setOptions((prevOptions) => {
                const newOptions = [...prevOptions]
                newOptions.splice(idx, 1)
                chrome.storage.local.set({ options: newOptions })

                return newOptions
              })
            }}
          />
        ))}
      </div>

      <button
        className="add-button"
        onClick={() => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            console.log(tabs)
            const url = (tabs[0].url ?? 'google.com')
              .replace(/https?:\/\/(www\.)?/g, '')
              .split('/')[0]
            const locale = 'en'

            chrome.storage.local.get('options', (items) => {
              const options: Option[] | undefined = items.options
              const newOptions: Option[] = options ? [...options] : []

              newOptions.push({
                url,
                locale,
              })

              chrome.storage.local.set({ options: newOptions }, () => {
                setOptions(newOptions)
              })
            })
          })
        }}
      >
        <Plus />
      </button>
    </div>
  )
}

export default App
