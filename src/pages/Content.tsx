import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { AppForm } from "../types/form-types";
import useTheme from "../hooks/useTheme";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import DataTable from "../components/DataTable";
import EditForm from "../components/EditForm";
import CreateForm from "../components/CreateForm";
import {
  capitalize,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export default function Content() {
  const { user, loading } = useContext(AuthContext);
  const { theme, isThemeDark } = useTheme();
  const [data, setData] = useState<AppForm[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSelectedData, setShowSelectedData] = useState<any>({});
  const [statusIndex, setStatusIndex] = useState<number>(0);
  const [prevData, setPrevData] = useState<AppForm>({
    id: "",
    company: "",
    title: "",
    link: "",
    salary: 0,
    notes: "",
    date: new Date(),
    location: "",
    status: "",
  });

  const statusOptions = [
    "all",
    "applied",
    "interview",
    "offer",
    "rejected",
    "screening",
    "assessment",
  ];

  const filteredData =
    statusIndex > 0 &&
    data.filter((props) => props.status.includes(statusOptions[statusIndex]))
      .length > 0
      ? data.filter((props) =>
          props.status.includes(statusOptions[statusIndex])
        )
      : data;

  useEffect(() => {
    (async () => {
      const query = await getDocs(
        collection(db, "applications", "user/", user?.uid as string)
      );
      const docsData: any = [];
      setIsLoadingData(true);
      try {
        query.forEach((doc) => {
          docsData.push({ id: doc.id, ...doc.data() });
        });
        setData(docsData);
        setIsLoadingData(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [data, user]);

  if (isLoadingData || loading)
    return (
      <div className="place-content-center text-center fixed left-0 right-0 top-0 bottom-0">
        <Loading theme={theme} />
      </div>
    );

  return (
    <div className="dark:bg-[#121212] dark:text-white px-6 py-8 relative">
      <h1 className="font-semibold text-2xl">Your Applications</h1>
      <div className="flex items-center space-x-4 mt-8">
        <button
          onClick={() => setShowModal((showModal) => !showModal)}
          className="font-medium text-sm bg-[#f2f2f3] hover:bg-[#eaeaeb] dark:bg-[#252525] dark:hover:bg-[#2b2b2b] rounded-full text-black dark:text-white px-4 py-2"
        >
          Create
        </button>
        <div className="h-9 border-l dark:border-[#ffffff18]"></div>
        <FormControl
          sx={{
            minWidth: 140,
          }}
        >
          <Select
            className="focus:outline-none dark:text-white border dark:[&>svg]:fill-white dark:border-[#ffffff18]"
            value={statusOptions[statusIndex]}
            onChange={(e: SelectChangeEvent) => {
              setStatusIndex(statusOptions.indexOf(e.target.value));
            }}
            MenuProps={{
              sx: {
                top: 2,
                ".MuiPaper-root": {
                  background: isThemeDark ? "#252525" : "#fff",
                },
                ul: {
                  color: isThemeDark ? "#fff" : "#000",
                },
              },
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {statusOptions.map((option, index) => (
              <MenuItem
                value={option}
                key={index}
                selected={index === statusIndex}
              >
                {capitalize(option)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <CreateForm isModalOpen={showModal} setIsModalOpen={setShowModal} />
      <div className="mt-8">
        {statusIndex > 0 &&
        data.filter((props) =>
          props.status.includes(statusOptions[statusIndex])
        ).length == 0 ? (
          <>No results</>
        ) : (
          <>
            <DataTable
              data={filteredData}
              showSelectedData={showSelectedData}
              setShowSelectedData={setShowSelectedData}
              setPrevData={setPrevData}
            />
            <EditForm
              data={filteredData}
              showSelectedData={showSelectedData}
              setShowSelectedData={setShowSelectedData}
              prevData={prevData}
              setPrevData={setPrevData}
            />
          </>
        )}
      </div>
    </div>
  );
}
