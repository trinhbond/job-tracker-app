import React from "react";
import { AppForm } from "../../../types/form-types";
import { useWindowDimensions } from "../../../hooks";
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
        <table className="table-fixed w-full overflow-x-scroll border-b border-[#c6c6c6] text-sm">
          <tbody>
            <tr>
              <th className="text-start font-medium py-2">ROLE</th>
              <th className="text-start font-medium py-2">COMPANY</th>
              <th className="text-start font-medium py-2">LOCATION</th>
              <th className="text-start font-medium py-2">STATUS</th>
              <th className="text-start font-medium py-2">SALARY</th>
              <th className="text-start font-medium py-2">DATE</th>
              <th className="text-start font-medium py-2 w-1/4">NOTES</th>
              <th className="w-[30px]"></th>
            </tr>
            {data.map((props, index) => (
              <tr className="border-t border-[#c6c6c6]" key={index}>
                <td className="py-2 pr-2 align-top">
                  <div className="text-black font-medium">{props.title}</div>
                </td>
                <td className="text-gray-payne py-2 pr-2 text-start align-top">
                  {props.link ? (
                    <a
                      href={props.link}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:no-underline inline-block"
                    >
                      {props.company}
                    </a>
                  ) : (
                    <span className="inline-block">{props.company}</span>
                  )}
                </td>
                <td className="text-gray-payne py-2 pr-2 text-start align-top">
                  <div className="text-gray-payne">{props.location}</div>
                </td>
                <td className="text-gray-payne py-2 pr-2 text-start align-top">
                  {props.status.toUpperCase()}
                </td>
                <td className="text-gray-payne py-2 pr-2 text-start align-top">
                  {props.salary && <>&#36;{props.salary}</>}
                </td>
                <td className="text-gray-payne py-2 pr-2 text-start align-top">
                  {new Date(props.date.seconds * 1000).toLocaleDateString(
                    "en-NZ"
                  )}
                </td>
                <td className="text-gray-payne py-2 pr-2 align-top w-1/4">
                  <p>{props.notes}</p>
                </td>
                <td className="text-gray-payne text-end py-2 align-top w-[40px]">
                  <button
                    onClick={() => toggleEdit(props.id, props)}
                    className="font-medium text-xs bg-[#f2f2f3] hover:bg-[#eaeaeb] rounded-full text-black p-1"
                  >
                    <MoreHoriz fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full table-fixed overflow-x-scroll border-b border-[#c6c6c6] text-[13px]">
          <tbody>
            {data.map((props, index) => (
              <tr className="border-t border-[#c6c6c6]" key={index}>
                <td className="py-2 pr-2 align-top">
                  <div className="text-gray-payne">{props.title}</div>
                </td>
                <td className="text-gray-payne py-2 pr-2 text-start align-top">
                  {props.link ? (
                    <a
                      href={props.link}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:no-underline inline-block text-black font-medium"
                    >
                      {props.company}
                    </a>
                  ) : (
                    <span className="inline-block text-black font-medium">
                      {props.company}
                    </span>
                  )}
                  {props.salary > 0 && (
                    <div className="text-gray-payne pt-2">
                      &#36;{props.salary}
                    </div>
                  )}
                  {props.location && (
                    <div className="text-gray-payne pt-2">{props.location}</div>
                  )}
                </td>
                <td className="text-gray-payne py-2 pr-2 text-start align-top">
                  {props.status.toUpperCase()}
                </td>
                <td className="text-gray-payne py-2 pr-2 text-start align-top">
                  {new Date(props.date.seconds * 1000).toLocaleDateString(
                    "en-NZ"
                  )}
                </td>
                <td className="text-gray-payne text-end py-2 align-top w-[30px]">
                  <button
                    onClick={() => toggleEdit(props.id, props)}
                    className="font-medium text-xs bg-[#f2f2f3] hover:bg-[#eaeaeb] rounded-full text-black p-1"
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
