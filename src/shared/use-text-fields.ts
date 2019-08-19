import { useState } from "react";
type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function useTextFields(initialValue: string) {
    const [value, setValue] = useState(initialValue);
    const onChange = (event: InputEvent) => setValue(event.target.value);
  
    return { value, onChange };
}
