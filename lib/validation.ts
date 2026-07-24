import * as yup from "yup";

export const opportunitySchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  organization: yup
    .string()
    .required("Organization is required")
    .min(2, "Organization must be at least 2 characters")
    .max(100, "Organization must not exceed 100 characters"),

  category: yup
    .string()
    .required("Category is required")
    .oneOf(
      [
        "Job",
        "Internship",
        "Scholarship",
        "Online Course",
        "Remote Work",
        "Training Program",
        "Volunteer Work",
      ],
      "Invalid category"
    ),

  location: yup
    .string()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters"),

  type: yup
    .string()
    .required("Type is required")
    .oneOf(["Remote", "On-site", "Hybrid"], "Invalid type"),

  deadline: yup
    .string()
    .required("Deadline is required")
    .test("is-future", "Deadline must be in the future", (value) => {
      if (!value) return false;

      const date = new Date(value);

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      return date >= today;
    }),

  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must not exceed 2000 characters"),

  requirements: yup
    .string()
    .required("Requirements are required")
    .min(5, "Requirements must be at least 5 characters"),

  applyLink: yup
    .string()
    .required("Apply link is required")
    .url("Please enter a valid URL")
    .matches(
      /^https?:\/\/.+\..+/,
      "Please enter a valid URL with http:// or https://"
    ),

  tags: yup.string().default("").required(),
});

export type OpportunityFormValues = yup.InferType<typeof opportunitySchema>;
