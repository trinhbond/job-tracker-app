import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { AppForm } from "../types/form-types";
import useTheme from "../hooks/useTheme";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import {
  DataTable,
  CreateForm,
  EditForm,
} from "../components/forms/Application";
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
    statusIndex > 0
      ? data.filter((props) =>
          props.status.includes(statusOptions[statusIndex])
        )
      : data;

  useEffect(() => {
    const fetchApplications = async () => {
      const q = query(
        collection(db, "applications", "user/", user?.uid as string)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docsData: any = [];
        setIsLoadingData(true);
        try {
          querySnapshot.forEach((doc) => {
            docsData.push({ id: doc.id, ...doc.data() });
          });
          setData(docsData);
          setIsLoadingData(false);
        } catch (error) {
          console.log(error);
        }
      });

      return () => unsubscribe();
    };

    fetchApplications();
  }, [user]);

  if (isLoadingData) return null;

  return (
    <div className="px-6 py-8 relative">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setShowModal((showModal) => !showModal)}
          className="font-medium text-sm bg-black hover:bg-[#333] text-white rounded-full px-4 py-2"
        >
          Create
        </button>
        <div className="h-9 border-l"></div>
        <FormControl
          sx={{
            minWidth: 140,
          }}
        >
          <Select
            value={statusOptions[statusIndex]}
            onChange={(e: SelectChangeEvent) => {
              setStatusIndex(statusOptions.indexOf(e.target.value));
            }}
            MenuProps={{
              sx: {
                ".MuiPaper-root": {
                  background: "#fff",
                },
                ul: {
                  color: "#000",
                },
              },
            }}
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
