import { IFormAppValues } from "../types";
import Dollar from "./icons/Dollar";
import Location from "./icons/Location";

export default function Card({
  props,
  onClick,
}: {
  props: IFormAppValues;
  onClick: () => void;
}) {
  return (
    <div
      key={props.id}
      onClick={onClick}
      className="relative p-4 border border-[#c6c6c6] rounded-md select-none cursor-pointer break-all flex flex-col gap-4"
    >
      <div className="flex flex-row justify-between gap-1 items-start">
        <h2 className="font-semibold">
          {props.company} | {props.title}
        </h2>
        {props.status?.length > 0 && (
          <div className="whitespace-nowrap text-xs bg-black text-white rounded-full px-2 py-1 select-none font-medium">
            {props.status}
          </div>
        )}
      </div>
      <div className="h-full">
        {!!props.location?.length && (
          <div className="flex flex-row gap-1 mb-2">
            <Location />
            <span className="w-11/12">{props.location}</span>
          </div>
        )}
        {props.salary > 0 && (
          <div className="flex flex-row gap-1 mb-2">
            <Dollar />
            <span className="w-11/12">{props.salary}</span>
          </div>
        )}
        {props.notes?.length > 0 && (
          <div className="mt-4">
            <p>{props.notes}</p>
          </div>
        )}
      </div>
      {props.date && (
        <div className="flex flex-row gap-1 self-auto place-self-end justify-self-start text-sm">
          <span>
            {props.date &&
              new Date(props.date.seconds * 1000).toLocaleDateString("en-NZ")}
          </span>
        </div>
      )}
    </div>
  );
}
