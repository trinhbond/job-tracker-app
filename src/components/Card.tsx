import { AppForm } from "../types";
import { Elipsis } from "./icons/Elipsis";

interface Card {
  props: AppForm;
  onClick: () => void;
}

export default function Card({ props, onClick }: Card) {
  return (
    <div
      key={props.id}
      className="relative p-4 border border-[#c6c6c6] dark:border-[#ffffff18] rounded-sm select-none break-all flex flex-col gap-4"
    >
      <div className="flex flex-row justify-between gap-1 items-start">
        {props.link?.trim() ? (
          <div>
            <a
              href={props.link}
              target="_blank"
              rel="noreferrer"
              className="font-semibold hover:underline"
            >
              {props.title}
            </a>
            <span className="text-gray-payne dark:text-gray-default">
              {props.company}
            </span>
          </div>
        ) : (
          <div>
            <h2 className="font-semibold">{props.title}</h2>
            <span className="text-gray-payne dark:text-gray-default">
              {props.company}
            </span>
          </div>
        )}

        {props.status?.length > 0 && (
          <div className="whitespace-nowrap text-[11px] border border-[#c6c6c6] uppercase rounded-full px-2 py-1 select-none font-semibold">
            {props.status}
          </div>
        )}
      </div>
      <div className="h-full text-sm text-gray-payne dark:text-gray-default">
        <div className="flex flex-col gap-1 mb-2">
          {props.location && <span>{props.location}</span>}
          {props.salary > 0 && <span>&#36;{props.salary}</span>}
        </div>
        {props.notes?.length > 0 && (
          <div className="mt-4">
            <p>{props.notes}</p>
          </div>
        )}
      </div>
      {props.date && (
        <div className="flex flex-row gap-1 self-auto items-center place-self-end justify-self-start text-sm text-gray-payne dark:text-gray-default">
          <span>
            {props.date &&
              new Date(props.date.seconds * 1000).toLocaleDateString("en-NZ")}
          </span>
          <Elipsis
            onClick={onClick}
            className="cursor-pointer absolute right-3.5 dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5] dark:text-white rounded-full"
          />
        </div>
      )}
    </div>
  );
}
