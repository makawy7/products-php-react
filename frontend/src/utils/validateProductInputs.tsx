import { CreateProductErrors } from "../types/CreateProductErrors";
import { ProductFields } from "../types/ProductFields";
import { Dispatch, SetStateAction } from "react";

export const validateProductInputs = (
  Inputs: ProductFields,
  setErrors: Dispatch<SetStateAction<CreateProductErrors>>
) => {
  let failedValidation = false;
  // sku validation
  if (Inputs.sku === "") {
    setErrors((prev: CreateProductErrors) => ({
      ...prev,
      sku: "SKU is required",
    }));
    failedValidation = true;
  } else {
    setErrors((prev: CreateProductErrors) => ({
      ...prev,
      sku: null,
    }));
  }
  // name validation
  if (Inputs.name === "") {
    setErrors((prev: CreateProductErrors) => ({
      ...prev,
      name: "Name is required",
    }));
    failedValidation = true;
  } else {
    setErrors((prev: CreateProductErrors) => ({
      ...prev,
      name: null,
    }));
  }
  // price validation
  if (Inputs.price === "") {
    setErrors((prev: CreateProductErrors) => ({
      ...prev,
      price: "Price is required",
    }));
    failedValidation = true;
  } else if (isNaN(Number(Inputs.price))) {
    setErrors((prev: CreateProductErrors) => ({
      ...prev,
      price: "Price must be a number",
    }));
    failedValidation = true;
  } else {
    setErrors((prev: CreateProductErrors) => ({
      ...prev,
      price: null,
    }));
  }
  // type validation
  if (Inputs.type === "") {
    setErrors((prev: CreateProductErrors) => ({
      ...prev,
      type: "Please choose product type",
    }));
    failedValidation = true;
  } else if (!["dvd", "book", "furniture"].includes(Inputs.type)) {
    setErrors((prev: CreateProductErrors) => ({
      ...prev,
      type: "Type is invalid",
    }));
    failedValidation = true;
  } else {
    setErrors((prev: CreateProductErrors) => ({
      ...prev,
      type: null,
    }));
  }

  // type specific validation
  // dvd
  if (Inputs.type === "dvd") {
    if (Inputs.size === "") {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        size: "Size is required",
      }));
      failedValidation = true;
    }
  } else if (isNaN(Number(Inputs.size))) {
    setErrors((prev: CreateProductErrors) => ({
      ...prev,
      size: "Size must be a number",
    }));
    failedValidation = true;
  } else {
    setErrors((prev: CreateProductErrors) => ({
      ...prev,
      size: null,
    }));
  }

  // furniture
  if (Inputs.type === "furniture") {
    // height
    if (Inputs.height === "") {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        height: "Height is required",
      }));
      failedValidation = true;
    } else if (isNaN(Number(Inputs.height))) {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        height: "Height must be a number",
      }));
      failedValidation = true;
    } else {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        height: null,
      }));
    }
    // width
    if (Inputs.width === "") {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        width: "Width is required",
      }));
      failedValidation = true;
    } else if (isNaN(Number(Inputs.width))) {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        width: "Width must be a number",
      }));
      failedValidation = true;
    } else {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        width: null,
      }));
    }
    // length
    if (Inputs.length === "") {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        length: "Length is required",
      }));
      failedValidation = true;
    } else if (isNaN(Number(Inputs.length))) {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        length: "Length must be a number",
      }));
      failedValidation = true;
    } else {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        length: null,
      }));
    }
  }

  // book
  if (Inputs.type === "book") {
    if (Inputs.weight === "") {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        weight: "Weight is required",
      }));
      failedValidation = true;
    } else if (isNaN(Number(Inputs.weight))) {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        weight: "Weight must be a number",
      }));
      failedValidation = true;
    } else {
      setErrors((prev: CreateProductErrors) => ({
        ...prev,
        weight: null,
      }));
    }
  }
  if (failedValidation) return false;
  return true;
};
