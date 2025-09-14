import {
  Box,
  Button,
  FormControl,
  Input,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AppForm } from "../../../types/form-types";
import { useContext, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { notify, statusValues } from "../../../utils";
import { Controller, useForm } from "react-hook-form";
import { TextArea } from "../../TextArea";
import { ModalContentWrapper } from "./ModalContentWrapper";

export default function CreateForm({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useContext(AuthContext);
  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = useForm<AppForm>();
  const toastId = useRef("toast");

  const handleAddApplication = handleSubmit(async (data) => {
    try {
      await addDoc(
        collection(db, "applications", "user/", user?.uid as string),
        {
          ...data,
          date: new Date(),
        }
      );
      notify("Application added", "success", toastId);
      setIsModalOpen((isModalOpen) => !isModalOpen);
      reset();
    } catch (e) {
      console.error(e);
    }
  });

  const toggleModal = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
    reset();
  };

  return (
    <Modal open={isModalOpen} onClose={toggleModal}>
      <ModalContentWrapper width={{ xs: "100%", sm: 384, md: 384, lg: 384 }}>
        <Box component="div" fontSize={20} fontWeight={500}>
          New application
        </Box>
        <Box
          className="create-form"
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          mt={3}
          onSubmit={handleAddApplication}
        >
          <Box display="flex" flexDirection="column">
            <FormControl>
              <Box component="label">
                Role <span className="text-red-600">*</span>
              </Box>
              <Controller
                control={control}
                name={"title"}
                render={() => (
                  <Input
                    error={!!errors.title}
                    placeholder="Role"
                    {...register("title", {
                      required: {
                        value: true,
                        message: "Title is required",
                      },
                      pattern: {
                        value: /[^' ']+/,
                        message: "Title is required",
                      },
                    })}
                  />
                )}
              />
              {errors.title && (
                <Typography component="p" role="alert">
                  {errors.title.message}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box display="flex" flexDirection="column">
            <FormControl>
              <Box component="label">
                Company <span className="text-red-600">*</span>
              </Box>
              <Controller
                control={control}
                name={"company"}
                render={() => (
                  <Input
                    error={!!errors.company}
                    placeholder="Company"
                    {...register("company", {
                      required: {
                        value: true,
                        message: "Company is required",
                      },
                      pattern: {
                        value: /[^' ']+/,
                        message: "Company is required",
                      },
                    })}
                  />
                )}
              />
              {errors.company && (
                <Typography component="p" role="alert">
                  {errors.company.message}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box display="flex" flexDirection="column">
            <FormControl>
              <Box component="label">Location</Box>
              <Controller
                control={control}
                name={"location"}
                render={() => (
                  <Input placeholder="Location" {...register("location")} />
                )}
              />
            </FormControl>
          </Box>
          <Box display="flex" flexDirection="column">
            <FormControl>
              <Box component="label">Status</Box>
              <Controller
                control={control}
                name={"status"}
                render={() => (
                  <FormControl>
                    <Select
                      {...register("status")}
                      displayEmpty
                      defaultValue={""}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {statusValues.slice(1).map((option) => (
                        <MenuItem value={option} key={option}>
                          {option.slice(0, 1).toUpperCase() +
                            option.substring(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </FormControl>
          </Box>
          <Box display="flex" flexDirection="column">
            <FormControl>
              <Box component="label">Link</Box>
              <Controller
                control={control}
                name={"link"}
                render={() => (
                  <Input placeholder="Link" {...register("link")} />
                )}
              />
            </FormControl>
          </Box>
          <Box display="flex" flexDirection="column">
            <FormControl>
              <Box component="label">Salary</Box>
              <Controller
                control={control}
                name={"salary"}
                render={() => (
                  <Input
                    type="number"
                    placeholder="Salary"
                    {...register("salary")}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box display="flex" flexDirection="column">
            <FormControl>
              <Box component="label">Notes</Box>
              <Controller
                control={control}
                name={"notes"}
                render={() => (
                  <TextArea placeholder="Notes" {...register("notes")} />
                )}
              />
            </FormControl>
          </Box>
          <Box>
            <Button variant="contained" type="submit">
              Confirm
            </Button>
            <Box display="inline-block" ml={1} paddingX={1} paddingY={2}>
              <Button
                variant="text"
                sx={{
                  color: "#000",
                }}
                onClick={toggleModal}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </ModalContentWrapper>
    </Modal>
  );
}
