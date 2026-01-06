import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { AppForm } from "../lib/form-types";
import { AuthContext } from "../context/AuthContext";
import { Box, styled, Typography, useTheme } from "@mui/material";
import { Fallback } from "../components/Fallback";
import { PieCenterLabel } from "../components/PieCenterLabel";
import { legendClasses } from "@mui/x-charts/ChartsLegend";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState<AppForm[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const theme = useTheme();

  const getNumJobs = (data: AppForm[], daysCount: number) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - daysCount);

    return data.filter((job) => {
      const jobDate = job.date.toDate();
      return jobDate >= oneWeekAgo;
    });
  };

  const dailyJobCount = getNumJobs(data, 1).length;
  const weeklyJobCount = getNumJobs(data, 7).length;
  const monthlyJobCount = getNumJobs(data, 21).length;

  const total = data.length;
  const rejected = data.filter((item) => item.status === "rejected").length;
  const offers = data.filter((item) => item.status === "offer").length;
  const applied = data.filter((item) => item.status === "applied").length;
  const percentageRejected = (rejected / total) * 100;
  const percentageApplied = (applied / total) * 100;
  const percentageOffers = (offers / total) * 100;

  const settings = {
    margin: { right: 5 },
    height: 300,
  };

  const pieData = [
    {
      label: "Rejected",
      value: data.filter((x) => x.status === "rejected").length,
      color: "#0088FE",
    },
    {
      label: "Applied",
      value: data.filter((x) => x.status === "applied").length,
      color: "#00C49F",
    },
    {
      label: "Interview",
      value: data.filter((x) => x.status === "interview").length,
      color: "#FFBB28",
    },
    {
      label: "Assessment",
      value: data.filter((x) => x.status === "assessment").length,
      color: "#FF8042",
    },
    {
      label: "Offer",
      value: data.filter((x) => x.status === "offer").length,
      color: "#10b981",
    },
    {
      label: "Screening",
      value: data.filter((x) => x.status === "screening").length,
      color: "#8b5cf6",
    },
  ].filter((item) => item.value > 0);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return null;

      const q = query(collection(db, "applications", "user/", user.uid));
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

  if (isLoadingData) return <Fallback />;

  const StyledContainer = styled("div")({
    flexGrow: 1,
    background:
      theme.palette.mode === "dark" ? "inherit" : theme.palette.primary.main,
    border:
      theme.palette.mode === "dark"
        ? "0.5px solid #272727"
        : "0.5px solid #e5e7eb",
    borderRadius: 8,
    padding: 16,
  });

  return (
    <Box
      position="relative"
      paddingX={3}
      paddingY={4}
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <Box>
        <Typography variant="h1" fontSize={26} fontWeight={600}>
          Dashboard
        </Typography>
        <Typography color="#7b7b7b">Track your applications here.</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <StyledContainer>
          <Box
            sx={{
              height: 160,
              width: 160,
            }}
          >
            <Typography fontWeight={500}>Total Applications</Typography>
            <Box component="span" display="block" color="#7b7b7b">
              {data.length}
            </Box>
          </Box>
        </StyledContainer>
        <StyledContainer>
          <Typography fontWeight={500}>Applied</Typography>
          <Box component="span" display="block" color="#7b7b7b">
            {applied}
          </Box>
          <Box sx={{ height: 160, width: 160 }}>
            <PieChart
              margin={{ left: 10, right: 10 }}
              series={[
                {
                  innerRadius: "80%",
                  data: [
                    {
                      id: 0,
                      value: applied,
                      color: "yellow",
                    },
                    {
                      id: 1,
                      value: total - applied,
                      color: "lightyellow",
                    },
                  ],
                },
              ]}
            >
              <PieCenterLabel>{`${Math.round(
                percentageApplied
              )}%`}</PieCenterLabel>
            </PieChart>
          </Box>
        </StyledContainer>
        <Box
          sx={{
            flexGrow: 1,
            background:
              theme.palette.mode === "dark"
                ? "inherit"
                : theme.palette.primary.main,
            border:
              theme.palette.mode === "dark"
                ? "0.5px solid #272727"
                : "0.5px solid #e5e7eb",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Box>
            <Typography fontWeight={500}>Rejections</Typography>
            <Box component="span" display="block" color="#7b7b7b">
              {rejected}
            </Box>
            <Box
              sx={{
                height: 160,
                width: 160,
              }}
            >
              <PieChart
                margin={{ left: 10, right: 10 }}
                series={[
                  {
                    innerRadius: "80%",
                    data: [
                      {
                        id: 0,
                        value: rejected,
                        color: "blue",
                      },
                      {
                        id: 1,
                        value: total - rejected,
                        color: "lightblue",
                      },
                    ],
                  },
                ]}
              >
                <PieCenterLabel>{`${Math.round(
                  percentageRejected
                )}%`}</PieCenterLabel>
              </PieChart>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            background:
              theme.palette.mode === "dark"
                ? "inherit"
                : theme.palette.primary.main,
            border:
              theme.palette.mode === "dark"
                ? "0.5px solid #272727"
                : "0.5px solid #e5e7eb",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Typography fontWeight={500}>Offers</Typography>
          <Box component="span" display="block" color="#7b7b7b">
            {offers == 0 ? "None" : offers}
          </Box>
          <Box sx={{ height: 160, width: 160 }}>
            <PieChart
              margin={{ left: 10, right: 10 }}
              series={[
                {
                  innerRadius: "80%",
                  data: [
                    {
                      id: 0,
                      value: offers,
                      color: "green",
                    },
                    {
                      id: 1,
                      value: total - offers,
                      color: "lightgreen",
                    },
                  ],
                },
              ]}
            >
              <PieCenterLabel>{`${Math.round(
                percentageOffers
              )}%`}</PieCenterLabel>
            </PieChart>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography
          component="span"
          display="block"
          fontWeight={600}
          fontSize={16}
          mb={1}
        >
          Applications by status
        </Typography>
        <StyledContainer>
          <Box
            sx={{
              width: "100%",
              display: "inline-block",
            }}
          >
            <PieChart
              slotProps={{
                legend: {
                  direction: "row",
                  padding: 4,
                  labelStyle: { fontSize: 14 },
                  position: { vertical: "bottom", horizontal: "middle" },
                },
              }}
              series={[
                {
                  innerRadius: 50,
                  outerRadius: 100,
                  data: pieData,
                  arcLabel: "value",
                },
              ]}
              sx={{
                [`.${legendClasses.mark}`]: {
                  ry: 10,
                },
              }}
              {...settings}
            />
          </Box>
        </StyledContainer>
      </Box>
      <Box>
        <Typography
          component="span"
          display="block"
          fontWeight={600}
          fontSize={16}
          mb={1}
        >
          Frequency of applications
        </Typography>
        <StyledContainer>
          <Box
            sx={{
              display: "flex",
              justifyItems: "space-evenly",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "inline-block",
                padding: 2,
                borderRight:
                  theme.palette.mode === "dark"
                    ? "0.5px solid #272727"
                    : "0.5px solid #e5e7eb",
                width: "100%",
              }}
            >
              <Typography textAlign="center" fontSize={24} fontWeight={500}>
                {dailyJobCount}
              </Typography>
              <Typography
                component="span"
                color="#7b7b7b"
                display="block"
                textAlign="center"
              >
                Today
              </Typography>
            </Box>
            <Box
              sx={{
                display: "inline-block",
                padding: 2,
                width: "100%",
                borderRight:
                  theme.palette.mode === "dark"
                    ? "0.5px solid #272727"
                    : "0.5px solid #e5e7eb",
              }}
            >
              <Typography textAlign="center" fontSize={24} fontWeight={500}>
                {weeklyJobCount}
              </Typography>
              <Typography
                component="span"
                color="#7b7b7b"
                display="block"
                textAlign="center"
              >
                This week
              </Typography>
            </Box>
            <Box
              sx={{
                display: "inline-block",
                padding: 2,
                width: "100%",
              }}
            >
              <Typography textAlign="center" fontSize={24} fontWeight={500}>
                {monthlyJobCount}
              </Typography>
              <Typography
                component="span"
                color="#7b7b7b"
                display="block"
                textAlign="center"
              >
                This month
              </Typography>
            </Box>
          </Box>
        </StyledContainer>
      </Box>
    </Box>
  );
}
