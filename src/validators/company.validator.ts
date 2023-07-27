import {Joi, Segments, celebrate} from "celebrate";

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    numberOfUsers: Joi.number().integer().required(),
    numberOfProducts: Joi.number().integer().required(),
    percentage: Joi.number().required(),
    userEmail: Joi.string().required(),
  }),
});

export default {
  create,
};
