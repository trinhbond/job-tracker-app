import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { AppForm } from "../types/form-types";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import {
  DataTable,
  CreateForm,
  EditForm,
} from "../components/forms/Application";
import {
  Box,
  Button,
  capitalize,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { statusValues } from "../utils";

export default function Content() {
  const { user, loading } = useContext(AuthContext);
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
  const toggleModal = () => setShowModal((showModal) => !showModal);

  const filteredData =
    statusIndex > 0
      ? data.filter((props) => props.status.includes(statusValues[statusIndex]))
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
    <Box position="relative" paddingX={3} paddingY={4}>
      <Box display="flex" alignItems="center" gap={2}>
        <Button variant="contained" onClick={toggleModal}>
          Create
        </Button>
        <div className="h-9 border-l"></div>
        <FormControl
          sx={{
            minWidth: 140,
          }}
        >
          <Select
            value={statusValues[statusIndex]}
            onChange={(e: SelectChangeEvent) => {
              setStatusIndex(statusValues.indexOf(e.target.value));
            }}
          >
            {statusValues.map((option, index) => (
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
      </Box>
      <CreateForm isModalOpen={showModal} setIsModalOpen={setShowModal} />
      <Box mt={4}>
        {statusIndex > 0 &&
        data.filter((props) => props.status.includes(statusValues[statusIndex]))
          .length == 0 ? (
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
      </Box>
    </Box>
  );
}
