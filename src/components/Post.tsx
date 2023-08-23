import React, { useState, useEffect, useContext } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";
import { Box } from "@material-ui/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { userContext } from "../context";

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
    editable: true,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: true,
  },
  {
    field: "username",
    headerName: "UserName",
    width: 200,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 400,
    editable: true,
  },
];

const Post: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const { setActive } = useContext(userContext);

  // fetching data from the API
  const POST_API: string = "https://jsonplaceholder.typicode.com/users";
  const fetchData = async () => {
    try {
      const response = await axios.get<UserData[]>(POST_API);
      const fetchedUsers = response.data.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      }));
      fetchedUsers.length > 0 && setUsers(fetchedUsers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    setActive("posts");
  }, []);

  return (
    <>
      {/* user data  */}
      <Container style={{marginTop:"2rem"}}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Container>
      {/*  */}
    </>
  );
};

export default Post;
