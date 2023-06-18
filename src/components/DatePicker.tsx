import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker"
import type{Value} from "react-multi-date-picker"

export default function DatePickerChart() {
  const [values, setValues] = useState<Value>([])


  

  
return (
<DatePicker
  value={values}
  onChange={setValues}
  range
  minDate={new DateObject().subtract(31, "days")}
  maxDate={new DateObject().add(0, "days")}
/>
);
}