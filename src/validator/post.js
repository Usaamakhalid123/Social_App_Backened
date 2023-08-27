import Joi from "joi";

const postValidator = {
    create: (req, res, next) => {
        const schema = Joi.object({
            title: Joi.string().min(3).max(10).required(),
            description: Joi.string().min(3).max(200).required(),
            user_id: Joi.string().required(),
        });
        
        req.body.user_id = req.user._id;  // Corrected to req.user._id

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next(); // Move to the next middleware
    },
};

export default postValidator;
