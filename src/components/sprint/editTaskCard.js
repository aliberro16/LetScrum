import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { Link,useParams } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FormInput from "../form-input/form-input.component";
import React, { useState } from "react";
function EditTaskCard() {
    const [progress, setProgress] = useState("");
    const handleChange = (e) => {
        const { progress, value } = e.target;
        setProgress((prevData) => ({
          ...prevData,
          [progress]: value,
        }));
      };
      const { id } = useParams();

  return (
    <Container>
      <Table>
        <TableHeader>
          <TR>
            <TH>Task</TH>
            <TH>Progress</TH>
            <TH>User</TH>
          </TR>
        </TableHeader>
        <TableContent>
          <TR>
            <TD>Task title</TD>
            <TD>
              <FormInputWraper>
                <FormInput
                  type="number"
                  name="progress"
                  value={progress.displayName}
                  onChange={handleChange}
                  label="Progress"
                  required
                />
              </FormInputWraper>
            </TD>
            <TD>
              <Autocomplete
                // label="Member"
                // variant="outlined"
                // style={{ width: 30 }}
                // comboBoxArray={stories}
                id="combo-box-Member"
                style={{ width: 200 }}
                options={Members}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Member"
                    variant="outlined"
                    // value="Mazen Hoballah"
                  />
                )}
              />
            </TD>
          </TR>
          <TR>
            <TD>Task title</TD>
            <TD>
              <FormInputWraper>
                <FormInput
                  type="number"
                  name="progress"
                  // value={data.displayName}
                  // onChange={handleChange}
                  label="Progress"
                  required
                />
              </FormInputWraper>
            </TD>
            <TD>
              <Autocomplete
                // label="Member"
                // variant="outlined"
                // style={{ width: 30 }}
                // comboBoxArray={stories}
                id="combo-box-Member"
                style={{ width: 200 }}
                options={Members}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Member"
                    variant="outlined"
                    // value="Mazen Hoballah"
                  />
                )}
              />
            </TD>
          </TR>
        </TableContent>
      </Table>
      <BtnWraper>
        <Link to={`/work/${id}/sprint/sprintbacklog`}>
          <Button variant="contained" color="primary" size="meduim">
            Done
          </Button>{" "}
        </Link>
        <Button variant="contained" color="secondary" size="meduim">
          Cancel
        </Button>{" "}
      </BtnWraper>
    </Container>
  );
}
const Members = [{ name: "Mazen Hoballah" }, { name: "Ali Berro" }];
export default EditTaskCard;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${
    "" /* Button{
      width:fit-content;;
  } */
  }

  ${"" /* background-color:red; */}
`;
const Table = styled.table`
  width: 100%;
  ${"" /* background-color:red; */}
`;
const TH = styled.th`
  width: 100%;
  ${"" /* background-color: #3f51b5; */}
  ${"" /* border-right: 1px solid #000000; */}
  font-size: 15px;
  ${"" /* color: white; */}
`;
const TR = styled.tr`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #9e9e9e;
  ${"" /* background-color: #edecee; */}
`;
const TableHeader = styled.div`
  ${"" /* width: 1000px; */}
  position: sticky;
  top: 0;
  z-index: 2;
  border-bottom: 2px solid black;

  ${"" /* background-color:red; */}
`;
const TD = styled.td`
  ${"" /* background-color:black; */}
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${"" /* padding:5px; */}
`;
const TableContent = styled.div`
  width: 100%;
  ${"" /* display:fele */}
  ${"" /* background-color:red; */}
`;
const BtnWraper = styled.div`
  ${"" /* width: 100%; */}
  ${"" /* display:fele */}
 ${"" /* background-color:red; */}
  margin-top:15px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const FormInputWraper = styled.div`
  margin-top: -25px;
  width:100px;
`;
