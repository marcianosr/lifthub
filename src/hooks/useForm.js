import React from "react";
import { DateTime } from "luxon";

const useForm = route => {
  const date = DateTime.local(); // get today's date
  const [disabled, setDisabled] = React.useState(false);
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

  React.useEffect(() => {
    const localStorageKeys = Object.keys(localStorage).filter(item =>
      item.includes("training") ? item : null
    );
    const items = localStorageKeys.map(key => localStorage.getItem(key));

    const date = items
      .map(item => JSON.parse(item))
      .find(item => {
        return item.date === data.date;
      });

    console.log(date);
    if (date) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  });
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

      setData(item);
    }
  }, []);

  return [data, setData, onChange, onSubmit, disabled];
};

export default useForm;
