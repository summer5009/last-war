import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";

import styles from "./reg.module.css";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import users from "../user.json";
import type { UserType } from "types/user";

type NameOptionType = Pick<UserType, "userSeq" | "name">;
export default function UserReg() {
  const [user, setUser] = useState<Partial<UserType> | undefined>();

  const onChange = (e: any, newValue: NameOptionType | null) => {
    console.log(newValue);
    if (newValue) {
      if (user) {
        setUser({ ...user, name: newValue.name });
      } else {
        setUser({ name: newValue.name });
      }
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <section className={styles.wrap}>
      {/* <div className={styles.container}></div> */}
      <Box sx={{ minWidth: "70dvw" }}>
        <Card>
          {/* <CardHeader> */}

          {/* </CardHeader> */}
          <CardContent>
            <Typography variant="h5" component="div" sx={{ p: 2 }}>
              연맹원 등록
            </Typography>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Autocomplete
                clearOnEscape
                // disableClearable
                options={users}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="연맹원명" />
                )}
                onChange={(e, newValue) => onChange(e, newValue)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </section>
  );
}
