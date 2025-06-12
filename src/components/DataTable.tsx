import React from "react";
import { AppForm } from "../types";
import { useWindowDimensions } from "../hooks";
import { MoreHoriz } from "@mui/icons-material";

export default function DataTable({
  data,
  setShowSelectedData,
  showSelectedData,
  setPrevData,
}: {
  data: AppForm[];
  setShowSelectedData: React.Dispatch<React.SetStateAction<boolean>>;
  showSelectedData: any;
  setPrevData: React.Dispatch<React.SetStateAction<AppForm>>;
}) {
  const { width } = useWindowDimensions();
  const toggleEdit = (id: string, props: AppForm) => {
    setShowSelectedData({
      ...showSelectedData,
      [id]: !showSelectedData[id],
    });
    setPrevData(props);
  };

  return (
    <div>
      {width > 768 ? (
        <table className="table-fixed w-full overflow-x-scroll border-b border-[#c6c6c6] dark:border-[#ffffff18] text-sm">
          <tbody>
            <tr>
              <th className="text-start font-medium py-2">COMPANY</th>
              <th className="text-start font-medium py-2">LINK</th>
              <th className="text-start font-medium py-2">STATUS</th>
              <th className="text-start font-medium py-2">SALARY</th>
              <th className="text-start font-medium py-2">APPLIED</th>
              <th className="text-start font-medium py-2">NOTES</th>
              <th></th>
            </tr>
            {data.map((props) => (
              <tr className="border-t border-[#c6c6c6] dark:border-[#ffffff18]">
                <td className="py-2 pr-2 align-top">
                  <div className="text-gray-payne dark:text-gray-default">
                    {props.title}
                  </div>
                  <div className="text-black font-medium dark:text-white">
                    {props.company}
                  </div>
                  {props.location && (
                    <div className="text-gray-payne dark:text-gray-default pt-2">
                      {props.location}
                    </div>
                  )}
                </td>
                <td className="text-gray-payne dark:text-gray-default py-2 pr-2 text-start align-top">
                  <a
                    href={props.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block underline hover:no-underline"
                  >
                    {props.link && props.company}
                  </a>
                </td>
                <td className="text-gray-payne dark:text-gray-default py-2 pr-2 text-start align-top">
                  {props.status.toUpperCase()}
                </td>
                <td className="text-gray-payne dark:text-gray-default py-2 pr-2 text-start align-top">
                  {props.salary && <>&#36;{props.salary}</>}
                </td>
                <td className="text-gray-payne dark:text-gray-default py-2 pr-2 text-start align-top">
                  {new Date(props.date.seconds * 1000).toLocaleDateString(
                    "en-NZ"
                  )}
                </td>
                <td className="text-gray-payne dark:text-gray-default py-2 pr-2 align-top">
                  <p>{props.notes}</p>
                </td>
                <td className="text-gray-payne dark:text-gray-default text-end py-2 align-top">
                  <button
                    onClick={() => toggleEdit(props.id, props)}
                    className="font-medium text-xs bg-[#f2f2f3] hover:bg-[#eaeaeb] dark:bg-[#252525] dark:hover:bg-[#2b2b2b] rounded-full text-black dark:text-white p-1"
                  >
                    <MoreHoriz fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full table-fixed overflow-x-scroll border-b border-[#c6c6c6] dark:border-[#ffffff18] text-[13px]">
          <tbody>
            {data.map((props) => (
              <tr className="border-t border-[#c6c6c6] dark:border-[#ffffff18]">
                <td className="py-2 align-top pr-1">
                  <div className="text-gray-payne dark:text-gray-default">
                    {props.title}
                  </div>
                  <div className="text-black font-medium dark:text-white">
                    {props.company}
                  </div>
                  {props.salary > 0 && (
                    <div className="text-gray-payne dark:text-gray-default pt-2">
                      &#36;{props.salary}
                    </div>
                  )}
                  {props.location && (
                    <div className="text-gray-payne dark:text-gray-default pt-2">
                      {props.location}
                    </div>
                  )}
                </td>
                <td className="text-gray-payne dark:text-gray-default py-2 pr-1 text-end align-top">
                  {props.status.toUpperCase()}
                </td>
                <td className="text-gray-payne dark:text-gray-default py-2 pr-1 text-end align-top">
                  {new Date(props.date.seconds * 1000).toLocaleDateString(
                    "en-NZ"
                  )}
                </td>
                <td className="text-gray-payne dark:text-gray-default text-end py-2 align-top">
                  <button
                    onClick={() => toggleEdit(props.id, props)}
                    className="font-medium text-xs bg-[#f2f2f3] hover:bg-[#eaeaeb] dark:bg-[#252525] dark:hover:bg-[#2b2b2b] rounded-full text-black dark:text-white p-1"
                  >
                    <MoreHoriz fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
