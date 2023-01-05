import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "../../../store"
import { EventSchedule, AvailabilityEnum } from "../core/entities"
import { chooseAvailabilityOption } from "../store/actions"
import { selectEventScheduleAvailabilityState } from "../store/selectors"

export const EventScheduleItem:FC<{eventSchedule: EventSchedule}> = ({eventSchedule}) => {
  const availabilityState = useSelector(selectEventScheduleAvailabilityState(eventSchedule.id))
  const dispatch = useDispatch<Dispatch>()
  
  const onChange = (value: AvailabilityEnum) => {
    dispatch(chooseAvailabilityOption( {id: eventSchedule.id, availabilityOption: value} ))

    console.log(value)
  }

  return (
    <li>
      <fieldset>
        <legend role="heading">{eventSchedule.times.toDateString()}</legend>
        <label><input type="radio" checked={availabilityState === "available"} onChange={() => onChange("available")} />available</label>
        <label><input type="radio" checked={availabilityState === "maybe"} onChange={() => onChange("maybe")}  />maybe</label>
        <label><input type="radio" checked={availabilityState === "unavailable"} onChange={() => onChange("unavailable")} />unavailable</label>
      </fieldset>
    </li>
  )

}