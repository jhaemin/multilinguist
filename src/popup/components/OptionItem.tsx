import React, { useState } from 'react'
import { Option } from '../../types'
import Checkmark from './Checkmark'
import ChevronDown from './ChevronDown'
import Minus from './Minus'
import Xmark from './Xmark'

export type OptionItemProps = {
  option: Option
  update: (newOption: Option) => void
  remove: () => void
}

const OptionItem: React.FC<OptionItemProps> = ({ option, update, remove }) => {
  const [localOption, setLocalOption] = useState<Option>({ ...option })
  const [isDirty, setIsDirty] = useState(false)

  return (
    <div className="option-item">
      <input
        value={localOption.url}
        onChange={(e) => {
          setIsDirty(true)

          setLocalOption((prevOption) => {
            return {
              ...prevOption,
              url: e.target.value,
            }
          })
        }}
      />

      <div className="select-wrapper">
        <select
          value={localOption.locale}
          onChange={(e) => {
            setIsDirty(true)

            setLocalOption((prevOption) => {
              return {
                ...prevOption,
                locale: e.target.value,
              }
            })
          }}
        >
          <option value="en">English</option>
          <option value="ko">Korean</option>
        </select>
        <div className="select-arrow">
          <ChevronDown />
        </div>
      </div>

      {isDirty ? (
        <button className="action-button" onClick={() => update(localOption)}>
          <Checkmark />
        </button>
      ) : (
        <button className="action-button" onClick={() => remove()}>
          <Minus />
        </button>
      )}
    </div>
  )
}

export default OptionItem
