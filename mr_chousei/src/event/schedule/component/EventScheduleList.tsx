import { FC } from "react"
import { useSelector } from "react-redux"
import { EventSchedule, AvailabilityEnum } from "../core/entities"
import { selectEventSchedules } from "../store/selectors"
import { EventScheduleItem } from "./EventScheduleItem"

export const EventSchedulesList: FC = () => {
  const eventSchedules = useSelector(selectEventSchedules)

  return (
    <>
      <ul>
        {eventSchedules.map((eventSchedule) => {
          return (<EventScheduleItem key={eventSchedule.id} eventSchedule={eventSchedule}/>)
        })}
      </ul>
    </>
  )
}
