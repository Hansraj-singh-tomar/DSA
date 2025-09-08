import {
  TRhfTextAreaProps,
  TRhfTextFieldProps,
  TRhfFileAttach,
  TRhfAsynComboboxProps,
  TMuiButtonProps,
  TDatePickerProps,
  TRhfComboboxProps,
  TRhfRadioButtonProps,
  TRhfMultiComboboxProps,
  TRhfCheckbox,
  TRhfMultiCheckbox,
  TRfhSwitchProps,
  TRfhMultiSwitchProps,
  TTimePickerProps,
  TRhfDragDrop,
  TRhfMultiCheckbox2,
  TRhfNumericIncDecProps,
  TRhfSunEditorProps,
} from "app/models/formFields"
import RhfTextArea from "./RhfTextArea"
import RHFCustomTextField from "./RhfTextField"
import RhfFileAttach from "./RhfFileAttach"
import RhfAsynCombobox from "./RhfAsynCombobox"
import RhfDatePicker from "./RhfDatePicker"
import RhfRadioButton from "./RhfRadioButton"
import RhfCombobox from "./RhfCombobox"
import RhfMultiCombobox from "./RhfMultiCombobox"
import RhfCheckbox from "./RhfCheckbox"
import RhfSwitch from "./RhfSwitch"
import RhfMultiSwitch from "./RhfMultiSwitch"
import RhfTimePicker from "./RhfTimePicker"
import RhfMultiCheckbox from "./RhfMultiCheckbox"
import MuiButton from "../MuiButton"
import RhfDragDrop from "./RhfDragDrop"
import RhfMultiCheckbox2 from "./RhfMultiCheckbox2"
import RhfNumericIncDec from "./RhfNumericIncDec"
import RhfSunEditor from "./RhfSunEditor"

type TRhfSelectorProps<T> = {
  selector:
    | "textfield"
    | "combobox"
    | "asyncCombobox"
    | "multiCombobox"
    | "radio"
    | "checkbox"
    | "multiCheckbox"
    | "button"
    | "attachment"
    | "textarea"
    | "dragdrop"
    | "multiCheckbox"
    | "date"
    | "switch"
    | "multiswitch"
    | "radioButton"
    | "time"
    | "numericIncDec"
    | "multiCheckbox2"
    | "sunEditor"
  rest:
    | TRhfTextFieldProps
    | TRhfTextAreaProps
    | TRhfFileAttach
    | TRhfAsynComboboxProps<T>
    | TMuiButtonProps
    | TRhfComboboxProps<T>
    | TRhfMultiComboboxProps<T>
    | TRfhSwitchProps
    | TRhfCheckbox
    | TRhfRadioButtonProps
    | TTimePickerProps
    | TRhfMultiCheckbox2
    | TRhfMultiCheckbox
    | TRhfDragDrop
    | TRhfSunEditorProps
}

function RhfSelector<T>(props: TRhfSelectorProps<T>) {
  const { selector, rest } = props
  switch (selector) {
    case "textfield": {
      const textFieldProps = rest as TRhfTextFieldProps
      return <RHFCustomTextField {...textFieldProps} />
    }

    case "textarea": {
      const textAreaProps = rest as TRhfTextAreaProps
      return <RhfTextArea {...textAreaProps} />
    }
    case "dragdrop": {
      const dragDropProps = rest as TRhfDragDrop
      return <RhfDragDrop {...dragDropProps} />
    }
    case "radio": {
      const radioButtonProps = rest as TRhfRadioButtonProps
      return <RhfRadioButton {...radioButtonProps} />
    }

    case "attachment": {
      const attachmentProps = rest as TRhfFileAttach
      return <RhfFileAttach {...attachmentProps} />
    }

    case "asyncCombobox": {
      const asyncComboboxProps = rest as TRhfAsynComboboxProps<T>
      return <RhfAsynCombobox<T> {...asyncComboboxProps} />
    }
    case "multiCombobox": {
      const multiComboboxProps = rest as TRhfMultiComboboxProps<T>
      return <RhfMultiCombobox<T> {...multiComboboxProps} />
    }
    case "date": {
      const dateProps = rest as TDatePickerProps
      return <RhfDatePicker {...dateProps} />
    }
    case "time": {
      const dateProps = rest as TDatePickerProps
      return <RhfTimePicker {...dateProps} />
    }
    case "checkbox": {
      const checkboxProps = rest as TRhfCheckbox
      return <RhfCheckbox {...checkboxProps} />
    }
    case "multiCheckbox": {
      const checkboxProps = rest as TRhfMultiCheckbox
      return <RhfMultiCheckbox {...checkboxProps} />
    }
    case "multiCheckbox2": {
      const multiCheckboxProps = rest as TRhfMultiCheckbox2
      return <RhfMultiCheckbox2 {...multiCheckboxProps} />
    }
    case "switch": {
      const switchProps = rest as TRfhSwitchProps
      return <RhfSwitch {...switchProps} />
    }
    case "multiswitch": {
      const multiswitchProps = rest as TRfhMultiSwitchProps
      return <RhfMultiSwitch {...multiswitchProps} />
    }
    case "numericIncDec": {
      const numericIncDecProps = rest as TRhfNumericIncDecProps
      return <RhfNumericIncDec {...numericIncDecProps} />
    }
    case "combobox": {
      const comboboxProps = rest as TRhfComboboxProps<T>
      return <RhfCombobox<T> {...comboboxProps} />
    }
    case "radioButton": {
      const radioButtonProps = rest as TRhfRadioButtonProps
      return <RhfRadioButton {...radioButtonProps} />
    }
    case "button": {
      const buttonProps = rest as TMuiButtonProps
      return <MuiButton {...buttonProps} />
    }
    case "sunEditor": {
      const editorProps = rest as TRhfSunEditorProps
      return <RhfSunEditor {...editorProps} />
    }
    default:
      return null
  }
}

export default RhfSelector
