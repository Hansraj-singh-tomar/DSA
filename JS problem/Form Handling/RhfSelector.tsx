import {
  TDatePickerProps,
  TDateTimePickerProps,
  TMuiButtonProps,
  TRfhSwitchProps,
  TRhfAsynComboboxProps,
  TRhfCheckbox,
  // TDatePickerProps,
  TRhfComboboxProps,
  TRhfDragDrop,
  TRhfFileAttach,
  TRhfFileAttachOnbording,
  TRhfMultiCheckbox,
  TRhfMultiCheckbox2,
  TRhfMultiComboboxProps,
  TRhfNumericIncDecProps,
  TRhfRadioButtonProps,
  // TRhfNumericIncDecProps,
  TRhfSunEditorProps,
  TRhfTextAreaProps,
  TRhfTextFieldProps,
  TTimePickerProps,
} from "app/models/formFields"
import RhfMultiCheckbox from "app/components/material-ui/react-hook-form/RhfMultiCheckbox"
import MuiButton from "../MuiButton"
import RhfAsynCombobox from "./RhfAsynCombobox"
import RhfCheckbox from "./RhfCheckbox"
import RhfCombobox from "./RhfCombobox"
import RhfDatePicker from "./RhfDatePicker"
import RhfDragDrop from "./RhfDragDrop"
import RhfFileAttach from "./RhfFileAttach"
import RhfFileAttachOnbording from "./RhfFileAttachOnbording"
import RhfMultiCombobox from "./RhfMultiCombobox"
import RhfRadioButton from "./RhfRadioButton"
import RhfSunEditor from "./RhfSunEditor"
import RhfSwitch from "./RhfSwitch"
import RHFCustomTextField from "./RhfTextField"
import RhfTimePicker from "./RhfTimePicker"
import RhfMultiCheckbox2 from "./RhfMultiCheckbox2"
import RhfTextArea from "./RhfTextArea"
import RhfNumericIncDec from "./RhfNumericIncDec"
import RhfDateTimePicker from "./RhfDateTimePicker"

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
    | "attachmentOnboarding"
    | "textarea"
    | "dragdrop"
    | "multiCheckbox"
    | "date"
    | "switch"
    | "radioButton"
    | "time"
    | "numericIncDec"
    | "multiCheckbox2"
    | "sunEditor"
    | "multiswitch"
    | "dateTime"
  rest:
    | TRhfTextFieldProps
    | TRhfTextAreaProps
    | TRhfFileAttach
    | TRhfFileAttachOnbording
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
    case "combobox": {
      const comboboxProps = rest as TRhfComboboxProps<T>
      return <RhfCombobox<T> {...comboboxProps} />
    }
    case "date": {
      const dateProps = rest as TDatePickerProps
      return <RhfDatePicker {...dateProps} />
    }
    case "time": {
      const dateProps = rest as TDatePickerProps
      return <RhfTimePicker {...dateProps} />
    }
    case "asyncCombobox": {
      const asyncComboboxProps = rest as TRhfAsynComboboxProps<T>
      return <RhfAsynCombobox<T> {...asyncComboboxProps} />
    }
    case "switch": {
      const switchProps = rest as TRfhSwitchProps
      return <RhfSwitch {...switchProps} />
    }
    case "radio": {
      const radioButtonProps = rest as TRhfRadioButtonProps
      return <RhfRadioButton {...radioButtonProps} />
    }
    case "radioButton": {
      const radioButtonProps = rest as TRhfRadioButtonProps
      return <RhfRadioButton {...radioButtonProps} />
    }
    case "checkbox": {
      const checkboxProps = rest as TRhfCheckbox
      return <RhfCheckbox {...checkboxProps} />
    }
    case "multiCombobox": {
      const multiComboboxProps = rest as TRhfMultiComboboxProps<T>
      return <RhfMultiCombobox<T> {...multiComboboxProps} />
    }
    case "button": {
      const buttonProps = rest as TMuiButtonProps
      return <MuiButton {...buttonProps} />
    }
    case "dragdrop": {
      const dragDropProps = rest as TRhfDragDrop
      return <RhfDragDrop {...dragDropProps} />
    }
    case "attachment": {
      const attachmentProps = rest as TRhfFileAttach
      return <RhfFileAttach {...attachmentProps} />
    }
    case "attachmentOnboarding": {
      const attachmentOnboardingProps = rest as TRhfFileAttachOnbording
      return <RhfFileAttachOnbording {...attachmentOnboardingProps} />
    }
    case "sunEditor": {
      const editorProps = rest as TRhfSunEditorProps
      return <RhfSunEditor {...editorProps} />
    }
    case "multiCheckbox2": {
      const multiCheckboxProps = rest as TRhfMultiCheckbox2
      return <RhfMultiCheckbox2 {...multiCheckboxProps} />
    }
    case "multiCheckbox": {
      const checkboxProps = rest as TRhfMultiCheckbox
      return <RhfMultiCheckbox {...checkboxProps} />
    }
    case "numericIncDec": {
      const numericIncDecProps = rest as TRhfNumericIncDecProps
      return <RhfNumericIncDec {...numericIncDecProps} />
    }
    case "dateTime": {
      const dateTimeProps = rest as TDateTimePickerProps
      return <RhfDateTimePicker {...dateTimeProps} />
    }
    default:
      return null
  }
}

export default RhfSelector
