import {
  Box,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import { AppForm } from "../../../lib/form-types";
import { useForm } from "react-hook-form";
import { deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { handleChange, notify, statusValues } from "../../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { TextArea } from "../../TextArea";
import { ModalContentWrapper } from "../../ModalContentWrapper";
import { FormContainer } from "../../FormContainer";
import { TextButton, BaseButton } from "../../buttons";
import { TextInput } from "../../TextInput";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

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
  const theme = useTheme();
  const { seconds } = prevData.date_applied as Timestamp;
  const dateValue = dayjs(new Date(seconds * 1000));

  const handleEditApplication = (
    id: string,
    event: React.BaseSyntheticEvent,
  ) => {
    event.preventDefault();
    setPrevData(prevData);

    if (!user) return null;

    try {
      if (!prevData.company.trim() || !prevData.title.trim()) {
        return;
      }
      updateDoc(doc(db, "applications", "user/", user.uid, id), {
        ...prevData,
      });
      notify("Your application has been updated", "success", toastId);
      setShowSelectedData({});
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = (id: string) => {
    if (!user) return;
    deleteDoc(doc(db, "applications", "user/", user.uid, id));
    notify("Your application has been deleted", "success", toastId);
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
            boxShadow={1}
            width={{ xs: "100%", sm: 384, md: 384, lg: 384 }}
          >
            <Box component="div" fontSize={20} fontWeight={500} mb={3}>
              Edit application
            </Box>
            <FormContainer
              className="edit-form"
              onSubmit={(event) => handleEditApplication(props.id, event)}
            >
              <Box display="flex" flexDirection="column">
                <Box component="label">Role</Box>
                <TextInput
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
                <Box component="label">Company</Box>
                <TextInput
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
                <TextInput
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
                <Box component="label">Date</Box>
                <DatePicker format="DD/MM/YYYY" value={dateValue} disabled />
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
                  defaultValue=""
                  sx={{
                    border:
                      theme.palette.mode === "dark"
                        ? "0.5px solid #272727"
                        : "0.5px solid #e5e7eb",
                    background:
                      theme.palette.mode === "dark"
                        ? "inherit"
                        : theme.palette.primary.main,
                    ":focus": { border: "none" },
                  }}
                >
                  <MenuItem value="">
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
                <TextInput
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
                <TextInput
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
                  style={{
                    border:
                      theme.palette.mode === "dark"
                        ? "0.5px solid #272727"
                        : "0.5px solid #e5e7eb",
                    background:
                      theme.palette.mode === "dark"
                        ? "inherit"
                        : theme.palette.primary.main,
                  }}
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
                  <BaseButton type="submit">Confirm</BaseButton>
                  <Box display="inline-block" ml={1} paddingX={1} paddingY={2}>
                    <TextButton onClick={handleToggle}>Cancel</TextButton>
                  </Box>
                </Box>
                <BaseButton
                  startIcon={<DeleteIcon fontSize="small" />}
                  onClick={() => handleDelete(prevData.id)}
                >
                  Delete
                </BaseButton>
              </Box>
            </FormContainer>
          </ModalContentWrapper>
        </Modal>
      ))}
    </>
  );
}
