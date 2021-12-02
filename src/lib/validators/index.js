
import * as yup from "yup";

export let RatingTickValidator = yup.object().shape({
    focusgroup: yup.string().required(),
    username: yup.string().required(),
    rating: yup.number().required(),
});

