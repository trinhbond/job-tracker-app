import {
  Box,
  Button,
  Input,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { AppForm } from "../../../types/form-types";
import { useForm } from "react-hook-form";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { handleChange, notify, statusValues } from "../../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { TextArea } from "../../TextArea";
import { ModalContentWrapper } from "./ModalContentWrapper";

export default function EditForm({
  data,
  prevData,
  setPrevData,
  setShowSelectedData,
  showSelectedData = false,
}: {
  data: AppForm[];
  prevData: AppForm;
  setPrevData: React.Dispatch<React.SetStateAction<AppForm>>;
  setShowSelectedData: React.Dispatch<React.SetStateAction<any>>;
  showSelectedData: any;
}) {
  const { user } = useContext(AuthContext);
  const { reset } = useForm<AppForm>();
  const toastId = useRef("toast");

  const handleEditApplication = (
    id: string,
    event: React.BaseSyntheticEvent
  ) => {
    event.preventDefault();
    setPrevData(prevData);

    try {
      if (!prevData.company.trim() || !prevData.title.trim()) {
        return;
      }
      updateDoc(doc(db, "applications", "user/", user?.uid as string, id), {
        ...prevData,
      });
      notify("Application updated", "success", toastId);
      setShowSelectedData({});
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = (id: string) => {
    deleteDoc(doc(db, "applications", "user/", user?.uid as string, id));
    notify("Application deleted", "success", toastId);
  };

  const handleToggle = () => {
    setShowSelectedData({});
    reset();
  };
  return (
    <>
      {data.map((props, index) => (
        <Modal
          open={showSelectedData[props.id] || false}
          onClose={handleToggle}
          key={index}
        >
          <ModalContentWrapper
            width={{ xs: "100%", sm: 384, md: 384, lg: 384 }}
          >
            <Box component="div" fontSize={20} fontWeight={500}>
              Edit application
            </Box>
            <Box
              className="edit-form"
              component="form"
              display="flex"
              flexDirection="column"
              gap={2}
              mt={3}
              onSubmit={(event) => handleEditApplication(props.id, event)}
            >
              <Box display="flex" flexDirection="column">
                <Box component="label">
                  Role <span className="text-red-600">*</span>
                </Box>
                <Input
                  error={!prevData.title.trim()}
                  placeholder="Role"
                  name="title"
                  id="title"
                  value={prevData.title}
                  onChange={(event) =>
                    handleChange(event, prevData, setPrevData)
                  }
                />
                {!prevData.title.trim() && (
                  <Typography component="p" role="alert">
                    Title is required
                  </Typography>
                )}
              </Box>
              <Box display="flex" flexDirection="column">
                <Box component="label">
                  Company
                  <span className="text-red-600">*</span>
                </Box>
                <Input
                  error={!prevData.company.trim()}
                  placeholder="Company"
                  name="company"
                  id="company"
                  value={prevData.company}
                  onChange={(event) =>
                    handleChange(event, prevData, setPrevData)
                  }
                />
                {!prevData.company.trim() && (
                  <Typography component="p" role="alert">
                    Company is required
                  </Typography>
                )}
              </Box>
              <Box display="flex" flexDirection="column">
                <Box component="label">Location</Box>
                <Input
                  placeholder="Location"
                  name="location"
                  id="location"
                  value={prevData.location}
                  onChange={(event) =>
                    handleChange(event, prevData, setPrevData)
                  }
                />
              </Box>
              <Box display="flex" flexDirection="column">
                <Box component="label">Status</Box>
                <Select
                  name="status"
                  id="status"
                  value={prevData.status}
                  onChange={(event: SelectChangeEvent) => {
                    const { name, value } = event.target;
                    setPrevData({ ...prevData, [name]: value });
                  }}
                  displayEmpty
                  defaultValue={""}
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {statusValues.slice(1).map((option) => (
                    <MenuItem value={option} key={option}>
                      {option.slice(0, 1).toUpperCase() + option.substring(1)}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box display="flex" flexDirection="column">
                <Box component="label">Link</Box>
                <Input
                  placeholder="Link"
                  name="link"
                  id="link"
                  value={prevData.link}
                  onChange={(event) =>
                    handleChange(event, prevData, setPrevData)
                  }
                />
              </Box>
              <Box display="flex" flexDirection="column">
                <Box component="label">Salary</Box>
                <Input
                  type="number"
                  placeholder="Salary"
                  name="salary"
                  id="salary"
                  value={prevData.salary}
                  onChange={(event) =>
                    handleChange(event, prevData, setPrevData)
                  }
                />
              </Box>
              <Box display="flex" flexDirection="column">
                <Box component="label">Notes</Box>
                <TextArea
                  placeholder="Notes"
                  name="notes"
                  id="notes"
                  value={prevData.notes}
                  onChange={(event) =>
                    handleChange(event, prevData, setPrevData)
                  }
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                alignItems="center"
                gap={1}
              >
                <Box>
                  <Button type="submit" variant="contained">
                    Confirm
                  </Button>
                  <Box display="inline-block" ml={1} paddingX={1} paddingY={2}>
                    <Button
                      variant="text"
                      sx={{
                        color: "#000",
                      }}
                      onClick={handleToggle}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => handleDelete(prevData.id)}
                >
                  <DeleteIcon fontSize="small" />
                  <Box component="span" pl={0.5}>
                    Delete
                  </Box>
                </Button>
              </Box>
            </Box>
          </ModalContentWrapper>
        </Modal>
      ))}
    </>
  );
}
