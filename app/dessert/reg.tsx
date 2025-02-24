import React, { useEffect, useState } from "react";

import styles from "./reg.module.css";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";

import dayjs from "dayjs";
import { client } from "apis/axios";

type TWarInfo = {
  title: string;
  eventDate: any;
};
export default function desertWarReg() {
  const [warInfo, setWarInfo] = useState<TWarInfo>({
    title: "",
    eventDate: dayjs().day(5),
  });
  const [users, setUsers] = useState<GridRowsProp>([]);
  const [checkedUsers, setCheckedUsers] = useState<
    { userSeq: string; hope: string }[]
  >([]);

  const renderHopeTeam: GridColDef["renderCell"] = (params) => {
    return (
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(_, hope) => {
          if (!params.hasFocus) return;
          console.log({ userSeq: params.row.userSeq, hope });
          const changed = { userSeq: params.row.userSeq, hope };
          if (checkedUsers.length > 0) {
            let yn = false;
            const updated = [...checkedUsers].map((item) => {
              if (item.userSeq === changed.userSeq) {
                item.hope = changed.hope;
                yn = true;
              }
              return item;
            });
            if (yn) {
              setCheckedUsers(updated);
            } else {
              setCheckedUsers([...checkedUsers, changed]);
            }
          } else {
            setCheckedUsers([changed]);
          }
        }}
      >
        <FormControlLabel value="A" control={<Radio />} label="A" />
        <FormControlLabel value="B" control={<Radio />} label="B" />
        <FormControlLabel value="ALL" control={<Radio />} label="ALL" />
        <FormControlLabel value="N" control={<Radio />} label="N" />
      </RadioGroup>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 50 },
    { field: "name", headerName: "이름", width: 150 },
    { field: "level", headerName: "레벨", width: 50 },
    { field: "power", headerName: "투력", width: 50 },
    { field: "leave", headerName: "탈퇴여부", width: 80 },
    { field: "", headerName: "출전조", width: 300, renderCell: renderHopeTeam },
  ];

  const getUsers = async () => {
    const res = await client.get("/users");
    console.log(res);
    if (res.status === 200) {
      setUsers(res.data);
    } else {
    }
  };

  const createDesertWar = async () => {
    const eventDate = dayjs(warInfo.eventDate).format("YYYY-MM-DD") + " 20:00";
    if (warInfo.title === "" || eventDate === "")
      return alert("사막전 정보는 필수입니다.");

    const desert = {
      title: warInfo.title,
      eventDate,
    };
    console.log({ checkedUsers, desert });
    const res = await client.post("/desert/hope/multi", {
      desert,
      desertHopes: checkedUsers,
    });
    console.log("saveRes =====", res);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className={styles.wrap}>
      <Box sx={{ width: "90%", marginTop: "1rem", boxSizing: "border-box" }}>
        <Card variant="outlined">
          <CardContent id="card" className={styles.card}>
            <TextField
              required
              id="outlined-required"
              label="사막전명"
              placeholder="사막전명 입력"
              sx={{ marginRight: "1rem", width: "20rem" }}
              onChange={(e) => {
                setWarInfo({ ...warInfo, title: e.target.value });
              }}
            />
            <DesktopDatePicker
              format="YYYY-MM-DD"
              defaultValue={warInfo.eventDate}
              onChange={(newValue) =>
                setWarInfo({ ...warInfo, eventDate: newValue })
              }
            />
          </CardContent>
        </Card>
      </Box>

      {/* 데이터 그리드 영역 S */}
      <Box
        sx={{
          width: "90%",
          marginTop: "1rem",
          boxSizing: "border-box",
          //   backgroundColor: "pink",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            // border: "1px solid red",
            marginBottom: "0.5rem",
            gap: "0.7rem",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "calc(50% - 50px)",
              top: "0.5rem",
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "100px" }}
              onClick={createDesertWar}
            >
              저장
            </Button>
          </Box>
          <TextField id="input-with-sx" label="연맹원" variant="standard" />
        </Box>

        <Box>
          <DataGrid rows={users} columns={columns} />
        </Box>
      </Box>
      {/* 데이터 그리드 영역 E */}
    </section>
  );
}
