import { IFormAppValues } from "../types";
import Dollar from "./icons/Dollar";
import Edit from "./icons/Edit";
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
      className="relative p-4 border border-[#c6c6c6] rounded-md select-none break-all flex flex-col gap-4"
    >
      <div className="flex flex-row justify-between gap-1 items-start">
        {props.link?.trim().length ? (
          <a
            href={props.link}
            target="_blank"
            rel="noreferrer"
            className="font-semibold hover:underline"
          >
            {props.company} | {props.title}
          </a>
        ) : (
          <h2 className="font-semibold">
            {props.company} | {props.title}
          </h2>
        )}

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
          <Edit
            onClick={onClick}
            className="cursor-pointer absolute right-3.5"
          />
        </div>
      )}
    </div>
  );
}
