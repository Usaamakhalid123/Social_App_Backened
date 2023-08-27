import joi from "joi";

export const commentValidator = {
  addComment: (req, res, next) => {
    const schema = joi.object({
      content: joi.string().min(3).max(1000).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: "Invalid Comment Data", error });

    next();
  },
};
