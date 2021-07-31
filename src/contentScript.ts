import type { Option } from './types'

chrome.storage.local.get(['options'], (items) => {
  const options: Option[] = items.options ?? []
  const hostname = window.location.hostname

  const optionIdx = options.findIndex(({ url }) => hostname.includes(url))

  console.log(optionIdx)

  if (optionIdx !== -1) {
    embedScript(options[optionIdx].locale)
  }
})

const embedScript = (locale: string) => {
  const code = `
    (() => {
      Object.defineProperties(Navigator.prototype, {
        language: {
          value: '${locale}',
          configurable: false,
          enumerable: true,
          writable: false
        },
        languages: {
          value: ['${locale}'],
          configurable: false,
          enumerable: true,
          writable: false
        }
      });
    })();`

  const script = document.createElement('script')
  script.textContent = code
  document.documentElement.prepend(script)
  script.remove()
}
