import { Typography, Input, Box, Button } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";

export default function EditUserForm({ onClick }: { onClick: () => void }) {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
    },
  });

  if (!user) return null;

  return (
    <Box
      padding={2}
      position="fixed"
      zIndex={40}
      top={0}
      right={0}
      height="100%"
      width={{ xs: "100%", sm: "384px", md: "384px", lg: "384px" }}
      sx={{ background: "#fff" }}
    >
      <Box fontSize={20} fontWeight={500}>
        Edit details
      </Box>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={2}
        marginTop={3}
        onSubmit={handleSubmit(async (data) =>
          updateProfile(user, { displayName: data.name }).then(() => {
            window.location.reload();
          })
        )}
      >
        <Box display="flex" flexDirection="column">
          <Box component="label">Name</Box>
          <Controller
            control={control}
            name={"name"}
            render={() => (
              <Input
                error={!!errors.name}
                {...register("name", {
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Name cannot have symbols or special characters",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                onChange={(e) =>
                  setValue("name", e.target.value, { shouldValidate: true })
                }
              />
            )}
          />
          {errors.name && (
            <Typography component="p" role="alert">
              {errors.name.message}
            </Typography>
          )}
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
              onClick={onClick}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
