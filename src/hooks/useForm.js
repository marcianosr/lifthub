import React from "react";
import { DateTime } from "luxon";

const useForm = route => {
  const date = DateTime.local(); // get today's date

  const [data, setData] = React.useState({
    name: "Training",
    date: `training-${date.toISODate()}`,
    program: [
      {
        id: 0,
        excersise: "",
        sets: [
          {
            id: 0,
            parentId: 0,
            weight: "",
            reps: "",
          },
        ],
      },
    ],
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onChange = e => {
    if (e.target.type === "date") {
      setData({
        ...data,
        date: `training-${e.target.value}`,
      });
      return;
    }
    if (e.target.name === "training-name") {
      setData({ ...data, name: e.target.value });
      return;
    }
  };

  const onSubmit = e => {
    setIsSubmitting(true);
  };

  // When the form is processed, it doesn't capture the correct state because the component hasn't been re-rendered yet.
  React.useEffect(() => {
    if (isSubmitting) {
      localStorage.setItem(data.date, JSON.stringify(data));
      setIsSubmitting(false);
    }
  }, [isSubmitting, data]);

  React.useEffect(() => {
    if (route) {
      const item = JSON.parse(localStorage.getItem(`${route}`));

      console.log(item);
      setData(item);
    }
  }, []);

  return [data, setData, onChange, onSubmit];
};

export default useForm;
