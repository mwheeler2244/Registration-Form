import React, { useState } from "react";
import "./index.css";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleInput(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate individual fields as user types
    validateField(name, value);
  }

  function validateField(name, value) {
    let errorMessage = "";

    switch (name) {
      case "firstName":
        if (value.length < 2) {
          errorMessage = "First name must be at least 2 characters long";
        } else if (!/^[A-Za-z]+$/.test(value)) {
          errorMessage = "First name should contain only letters";
        }
        break;
      case "lastName":
        if (value.length < 2) {
          errorMessage = "Last name must be at least 2 characters long";
        } else if (!/^[A-Za-z]+$/.test(value)) {
          errorMessage = "Last name should contain only letters";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = "Please enter a valid email address";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};

    // First Name validation
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters long";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = "First name should contain only letters";
    }

    // Last Name validation
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters long";
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last name should contain only letters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Update errors state
    setErrors(newErrors);

    // Check if form is valid
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>User Registration</h1>

        <div className="form-group">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleInput}
            type="text"
            placeholder="First Name"
            className={errors.firstName ? "error" : ""}
          />
          {errors.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleInput}
            type="text"
            placeholder="Last Name"
            className={errors.lastName ? "error" : ""}
          />
          {errors.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>

        <div className="form-group">
          <input
            name="email"
            value={formData.email}
            onChange={handleInput}
            type="text"
            placeholder="Email"
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <button type="submit">Submit</button>
        {isSubmitted && (
          <div className="success-message">Form submitted successfully!</div>
        )}
      </form>
    </div>
  );
}

export default Form;
