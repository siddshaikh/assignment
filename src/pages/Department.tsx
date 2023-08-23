import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context";
import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "100vw",
    marginTop: "2rem",
    border: "1px solid gray",
    borderRadius: "4px",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      marginLeft: 0,
      marginRight: 0,
      padding: "1rem",
    },
  },
  departContainer: {
    width: "100%",
  },
  departHeaderContainer: {
    display: "flex",
    alignItems: "center",
  },
  departHeaders: {
    cursor: "pointer",
  },
  subDepartContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    color: "red",
    alignContent: "center",
  },
  blue: {
    color: "blue",
    cursor: "pointer",
  },
  red: {
    color: "red",
    cursor: "pointer",
  },
}));
const Department: React.FC = () => {
  const { setActive } = useContext(userContext);
  const [hideAndShowFirst, setHideAndShowFirst] = useState<boolean>(false);
  const [hideAndShowSecond, setHideAndShowSecond] = useState<boolean>(false);
  const [containerHeight, setContainerHeight] = useState<number>(300);

  //state variables for the  checkbox (first department)
  // department(customer)
  const [customer, setCustomer] = useState<boolean>(false)
  //sub departMents
  const [support, setSupport] = useState<boolean>(true)
  const [success, setSuccess] = useState<boolean>(true)
  useEffect(() => {
    if (support && success) {
      setCustomer(true)
    } else if (customer) {
      setSupport(true), setSuccess(true)
    }
  }, [customer, support, success])
  const handleFirstDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setCustomer(isChecked);
    setSupport(isChecked);
    setSuccess(isChecked);
  }
  const handleFirstSubDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>, subDepart: string) => {
    const isChecked = e.target.checked
    switch (subDepart) {
      case 'support':
        setSupport(isChecked);
        break;
      case 'success':
        setSuccess(isChecked);
        break
      default:
        break;
    }
  }
  //state variables for the  checkbox (second department)
  //department(design)
  const [design, setDesign] = useState<boolean>(false);
  //sub departments
  const [graphic, setGaraphic] = useState<boolean>(true);
  const [product, setProduct] = useState<boolean>(true);
  const [web, setWeb] = useState<boolean>(true);
  useEffect(() => {
    if (graphic && product && web) {
      setDesign(true);
    } else if (design) {
      setGaraphic(true), setProduct(true), setWeb(true);
    }
  }, [design, graphic, product, web]);



  //setting height according to the hide and show
  useEffect(() => {
    setActive("department");
    const newHeight = hideAndShowFirst || hideAndShowSecond ? 600 : 300;
    setContainerHeight(newHeight);
  }, []);
  const classes = useStyles();
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setDesign(isChecked);
    setGaraphic(isChecked);
    setProduct(isChecked);
    setWeb(isChecked);
  };

  const handleSubDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>, subDepartment: string) => {
    const isChecked = e.target.checked
    switch (subDepartment) {
      case "graphic":
        setGaraphic(isChecked);
        break;
      case "product":
        setProduct(isChecked);
        break;
      case "web":
        setWeb(isChecked);
        break;
      default:
        break;
    }
  }
  return (
    <Container
      className={classes.mainContainer}
      style={{ height: containerHeight }}
    >
      <Container className={classes.departContainer}>
        <FormGroup>
          {/* first staff */}

          <div>
            <span className={classes.departHeaderContainer}>
              {!hideAndShowFirst ? (
                <AddIcon
                  className={classes.blue}
                  onClick={() => setHideAndShowFirst(true)}
                />
              ) : (
                <RemoveIcon
                  className={classes.red}
                  onClick={() => setHideAndShowFirst(false)}
                />
              )}

              <Checkbox checked={customer} onChange={handleFirstDepartmentChange} />
              <h2
                onClick={() => setHideAndShowFirst((prev) => !prev)}
                className={classes.departHeaders}
              >
                Customer Service
              </h2>
            </span>
          </div>
          {/* sub department */}
          <Container
            className={classes.subDepartContainer}
            style={{ display: hideAndShowFirst === false ? "none" : "" }}
          >
            <div>
              <FormControlLabel
                control={<Checkbox checked={support} onChange={(e) => handleFirstSubDepartmentChange(e, 'support')} />}
                label={"Support"}
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox checked={success} onChange={(e) => handleFirstSubDepartmentChange(e, 'success')} />}
                label={"Customer Success"}
              />
            </div>
          </Container>
          {/* second staff */}
          {/* department */}
          <div>
            <span className={classes.departHeaderContainer}>
              {!hideAndShowSecond ? (
                <AddIcon
                  className={classes.blue}
                  onClick={() => setHideAndShowSecond(true)}
                />
              ) : (
                <RemoveIcon
                  className={classes.red}
                  onClick={() => setHideAndShowSecond(false)}
                />
              )}

              <Checkbox checked={design} onChange={handleDepartmentChange} />
              <h2
                onClick={() => setHideAndShowSecond((prev) => !prev)}
                className={classes.departHeaders}
              >
                Design
              </h2>
            </span>
          </div>
          {/* sub department */}
          <Container
            className={classes.subDepartContainer}
            style={{ display: hideAndShowSecond === false ? "none" : "" }}
          >
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={graphic}
                    onChange={(e) => handleSubDepartmentChange(e, "graphic")}
                  />
                }
                label={"Graphic Design"}
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={product}
                    onChange={(e) => handleSubDepartmentChange(e, "product")}
                  />
                }
                label={"Product Design"}
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox checked={web} onChange={(e) => handleSubDepartmentChange(e, "web")} />
                }
                label={"Web Design"}
              />
            </div>
          </Container>
        </FormGroup>
      </Container>
    </Container>
  );
};

export default Department;
