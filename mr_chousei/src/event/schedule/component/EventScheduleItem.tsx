import { FC } from "react"
import { useSelector } from "react-redux"
import { EventSchedule, AvailabilityEnum } from "../core/entities"
import { selectEventScheduleAvailabilityState } from "../store/selectors"

export const EventScheduleItem:FC<{eventSchedule: EventSchedule}> = ({eventSchedule}) => {
  const availabilityState = useSelector(selectEventScheduleAvailabilityState(eventSchedule.id))

  const onChange = (value: AvailabilityEnum) => {
    console.log(value)
  }

  return (
    <li>
      <fieldset>
        <legend role="heading">{eventSchedule.times.toDateString()}</legend>
        <label><input type="radio" checked={availabilityState === "available"} onChange={() => onChange("available")} />OK</label>
        <label><input type="radio" checked={availabilityState === "maybe"} onChange={() => onChange("maybe")}  />MAYBE</label>
        <label><input type="radio" checked={availabilityState === "unavailable"} onChange={() => onChange("unavailable")} />NG</label>
      </fieldset>
    </li>
  )

}