import { AppFormValues } from "../types";
import { Elipsis } from "./icons/Elipsis";

export default function Card({
  props,
  onClick,
}: {
  props: AppFormValues;
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
          <div className="whitespace-nowrap text-xs bg-black text-white rounded-full px-4 py-1 select-none font-semibold">
            {props.status}
          </div>
        )}
      </div>
      <div className="h-full text-sm">
        <div className="flex flex-col gap-1 mb-2">
          {!!props.location?.length && <span>{props.location}</span>}
          {props.salary > 0 && <span>&#36;{props.salary}</span>}
        </div>
        {props.notes?.length > 0 && (
          <div className="mt-4">
            <p className="text-[#5a6881] dark:text-[#808080]">{props.notes}</p>
          </div>
        )}
      </div>
      {props.date && (
        <div className="flex flex-row gap-1 self-auto items-center place-self-end justify-self-start text-sm">
          <span>
            {props.date &&
              new Date(props.date.seconds * 1000).toLocaleDateString("en-NZ")}
          </span>
          <Elipsis
            onClick={onClick}
            className="cursor-pointer absolute right-3.5 dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5] dark:text-white rounded-full"
            // className="cursor-pointer absolute right-3.5 dark:hover:bg-[#18181B] dark:bg-[#2b2b2b] dark:text-white rounded-full"
          />
        </div>
      )}
    </div>
  );
}
