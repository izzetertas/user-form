import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Joi from "joi";
import axios from "axios";

import CountrySelect from "../CountrySelect";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import Title from "./Title";

const validationSchema = Joi.object({
  name: Joi.string().required().label("Name"),
  sex: Joi.string().required().valid("Male", "Female").label("Sex"),
  age: Joi.number().integer().min(0).required().label("Age"),
  country: Joi.string().required().label("Country"),
});

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: null,
    sex: null,
    age: null,
    country: null,
  });
  const [formValidationErrors, setFormValidationErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({});
  console.log("formValidationErrors==>", formValidationErrors);

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);

    if (Object.keys(formValidationErrors).length) {
      validateForm(newFormData);
    }
  };

  const validateForm = (formData) => {
    const result = validationSchema.validate(formData, { abortEarly: false });
    const { error } = result;

    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.context.key] = detail.message;
      });
      setFormValidationErrors(validationErrors);
      return false;
    } else {
      setFormValidationErrors({});
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit==>");
    if (!validateForm(formData)) {
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(process.env.API_BASE_URL, formData);
      setMessage({ status: "success" });
    } catch ({ response }) {
      if (response?.status <= 400) {
        setMessage({ status: "error", detail: response?.data?.message });
        return;
      }
      setMessage({
        status: "error",
        detail: "Something went wrong! Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Title status={message?.status} />
      {message?.status === "success" ? (
        <SuccessMessage name={formData.name} />
      ) : (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          display="flex"
          flexDirection="column"
          width="100%"
          maxWidth={["80%", 600]}
          height="auto"
          p={4}
          border="1px solid #cccccc"
          borderRadius={2}
        >
          <FormControl sx={{ mb: 3 }} error={!!formValidationErrors?.name}>
            <TextField
              required
              id="name"
              label="Name"
              name="name"
              defaultValue={formData.name}
              helperText={formValidationErrors.name}
              error={!!formValidationErrors.name && formValidationErrors.name}
              data-testid="name-test-id"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }} error={!!formValidationErrors.sex}>
            <RadioGroup
              row
              name="sex"
              required
              value={formData.sex}
              onChange={handleChange}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
            <FormHelperText>{formValidationErrors.sex}</FormHelperText>
          </FormControl>
          <FormControl sx={{ mb: 3 }} error={!!formValidationErrors.age}>
            <TextField
              type="number"
              required
              id="age"
              label="Age"
              name="age"
              helperText={formValidationErrors.age}
              error={!!formValidationErrors.age}
              defaultValue={formData.age}
              data-testid="age-test-id"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }} error={!!formValidationErrors.country}>
            <CountrySelect
              helperText={formValidationErrors.country}
              error={
                !!formValidationErrors.country && formValidationErrors.country
              }
              onChange={(e, option) =>
                handleChange({
                  ...e,
                  target: { name: "country", value: option?.label },
                })
              }
            />
          </FormControl>
          <Box>
            <Button
              size="large"
              maxWidth={100}
              variant="contained"
              disabled={submitting}
              onClick={handleSubmit}
            >
              Apply
            </Button>
          </Box>
          {message.status === "error" && (
            <ErrorMessage message={message.detail} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default RegisterForm;
