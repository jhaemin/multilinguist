import { Option } from './types'

let options: Option[] = []

chrome.storage.local.get(['options'], (items) => {
  options = items.options ?? []
})

chrome.storage.onChanged.addListener((changes) => {
  const optionsChange = changes.options

  if (optionsChange) {
    options = optionsChange.newValue

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id!)
    })
  }
})

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    if (options.length === 0) {
      return details
    }

    if (details.type !== 'main_frame') {
      return details
    }

    const optionIdx = options.findIndex(({ url }) => details.url.includes(url))

    if (optionIdx === -1) {
      return details
    }

    for (let i = 0; i < details.requestHeaders!.length; i++) {
      if (details.requestHeaders![i].name === 'Accept-Language') {
        details.requestHeaders![i].value = options[optionIdx].locale
        break
      }
    }

    const result = { requestHeaders: details.requestHeaders }

    return result
  },
  {
    urls: ['<all_urls>'],
  },
  ['blocking', 'requestHeaders', 'extraHeaders']
)
