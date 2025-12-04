import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { AppForm } from "../lib/form-types";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography } from "@mui/material";
import { Fallback } from "../components/Fallback";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState<AppForm[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const uniqueCompaniesCount = new Set(data.map((q) => q.company)).size;
  const jobCount = data.length;
  const dailyJobCount = getNumJobs(data, 1).length;
  const weeklyJobCount = getNumJobs(data, 7).length;
  const monthlyJobCount = getNumJobs(data, 21).length;

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

  function getNumJobs(data: AppForm[], daysCount: number) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - daysCount);

    return data.filter((job) => {
      const jobDate = job.date.toDate();
      return jobDate >= oneWeekAgo;
    });
  }

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

  return (
    <Box
      position="relative"
      paddingX={3}
      paddingY={4}
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <Box sx={{ background: "#fff", borderRadius: 2, padding: 2 }}>
        <Typography
          component="span"
          display="block"
          fontWeight={500}
          fontSize={16}
          mb={2}
        >
          Summary
        </Typography>
        <Box mb={1}>
          <Typography fontWeight={500}>Jobs applied</Typography>
          <Box component="span" display="block" color="#7b7b7b">
            {jobCount}
          </Box>
        </Box>
        <Box>
          <Typography fontWeight={500}>Unique companies</Typography>
          <Box component="span" display="block" color="#7b7b7b">
            {uniqueCompaniesCount}
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            background: "#fff",
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Typography
            component="span"
            display="block"
            fontWeight={500}
            fontSize={16}
            mb={2}
          >
            Frequency of applications
          </Typography>
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
                borderRight: "1px solid #e5e7eb",
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
                borderRight: "1px solid #e5e7eb",
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
        </Box>
      </Box>
      <Box
        sx={{
          background: "#fff",
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Typography
          component="span"
          display="block"
          fontWeight={500}
          fontSize={16}
          mb={2}
        >
          Applications by status
        </Typography>
        <Box
          sx={{
            width: "100%",
            alignSelf: "start",
            display: "inline-block",
          }}
        >
          <PieChart
            slotProps={{
              legend: {
                hidden: true,
                direction: "column",
                position: { vertical: "top", horizontal: "right" },
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
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontSize: 14,
              },
            }}
            {...settings}
          />
        </Box>
      </Box>
    </Box>
  );
}
